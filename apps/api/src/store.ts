import { randomUUID } from "node:crypto";
import { JsonFile } from "./json-file";
import { leadInputSchema, leadStatuses, type Lead, type LeadInput, type LeadStats, type LeadStatus } from "@designjanala/shared";

/** Persistence boundary. Swap MemoryLeadStore for a database-backed store without touching the routes. */
export interface LeadStore {
  list(filter?: { status?: LeadStatus }): Promise<Lead[]>;
  get(id: string): Promise<Lead | undefined>;
  create(input: LeadInput): Promise<Lead>;
  updateStatus(id: string, status: LeadStatus): Promise<Lead | undefined>;
  stats(now?: Date): Promise<LeadStats>;
}

const DAY = 24 * 60 * 60 * 1000;

export class MemoryLeadStore implements LeadStore {
  protected leads = new Map<string, Lead>();

  constructor(seed: Lead[] = []) {
    for (const lead of seed) this.leads.set(lead.id, lead);
  }

  /** Called after every change; FileLeadStore saves to disk here. */
  protected persist() {}

  async list(filter: { status?: LeadStatus } = {}) {
    return [...this.leads.values()]
      .filter((l) => !filter.status || l.status === filter.status)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async get(id: string) {
    return this.leads.get(id);
  }

  async create(input: LeadInput) {
    const now = new Date().toISOString();
    const lead: Lead = { ...leadInputSchema.parse(input), id: randomUUID(), status: "new", createdAt: now, updatedAt: now };
    this.leads.set(lead.id, lead);
    this.persist();
    return lead;
  }

  async updateStatus(id: string, status: LeadStatus) {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    const updated = { ...lead, status, updatedAt: new Date().toISOString() };
    this.leads.set(id, updated);
    this.persist();
    return updated;
  }

  async stats(now = new Date()) {
    const all = [...this.leads.values()];
    const byStatus = Object.fromEntries(leadStatuses.map((s) => [s, 0])) as Record<LeadStatus, number>;
    for (const l of all) byStatus[l.status]++;
    const since = now.getTime() - 7 * DAY;
    return { total: all.length, byStatus, last7Days: all.filter((l) => Date.parse(l.createdAt) >= since).length };
  }
}

/** Leads kept in a JSON file, so they survive restarts. Seeds the file only when it doesn't exist yet. */
export class FileLeadStore extends MemoryLeadStore {
  private readonly file: JsonFile<Lead[] | null>;

  constructor(path: string, seed: Lead[] = []) {
    const file = new JsonFile<Lead[] | null>(path, () => null);
    const saved = file.read();
    super(saved ?? seed);
    this.file = file;
    if (!saved) this.persist();
  }

  protected persist() {
    // `file` is unset while the parent constructor seeds the map.
    this.file?.write([...this.leads.values()]);
  }
}

/** A few example leads so the dashboard isn't empty in local development. */
export function demoLeads(now = Date.now()): Lead[] {
  const make = (i: number, name: string, company: string, service: string, status: LeadStatus, daysAgo: number): Lead => {
    const at = new Date(now - daysAgo * DAY).toISOString();
    return {
      id: `demo-${i}`,
      name,
      email: `${name.split(" ")[0].toLowerCase()}@${company.toLowerCase().replace(/\W/g, "")}.com`,
      company,
      service,
      budget: ["$5k – $15k", "$15k – $50k", "$50k+"][i % 3],
      details: `Looking for help with ${service.toLowerCase()} for ${company}.`,
      status,
      createdAt: at,
      updatedAt: at,
    };
  };
  return [
    make(1, "Sara Ahmed", "Nimbus Health", "AI Automation Systems", "new", 1),
    make(2, "Tom Becker", "Ledgerly", "SaaS Platform Engineering", "contacted", 3),
    make(3, "Mina Rahman", "Bazaar Go", "Mobile App Development", "proposal", 6),
    make(4, "Leo Park", "Orbit Labs", "Product & Brand Design", "won", 12),
    make(5, "Ava Chen", "Fieldwise", "Workflow Automation", "lost", 20),
  ];
}
