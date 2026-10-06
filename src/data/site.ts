// All site content lives here, migrated from the WordPress site (designjanala.com).
// Edit this file to update copy without touching components.

export const site = {
  name: "DesignJanala",
  tagline: "AI-Powered Product Design & Development Agency",
  location: "Dhaka, Bangladesh",
  url: "https://designjanala.com",
  emails: {
    project: "project@designjanala.com",
    career: "career@designjanala.com",
    sample: "sample@designjanala.com",
  },
  /** GitHub organisation URL. Leave empty to hide the "Visit GitHub" button on the Open Source page. */
  github: "",
};

export const nav = [
  { label: "Service", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Open Source", href: "/open-source" },
];

export const marketplaces = [
  { name: "Upwork", href: "https://www.upwork.com/o/profiles/users/_~01e12f672a175a73ac/" },
  { name: "Fiverr", href: "https://www.fiverr.com/zumanurr" },
  { name: "Creative Market", href: "https://creativemarket.com/designjanala" },
  { name: "GraphicRiver", href: "https://graphicriver.net/user/zumanuruzzal/portfolio" },
];

export const socials = [
  { name: "Facebook", short: "Fb", href: "https://www.facebook.com/KhulleiDesign" },
  { name: "LinkedIn", short: "In", href: "https://www.linkedin.com/in/zumanur-rahman/" },
  { name: "Instagram", short: "Ig", href: "https://www.instagram.com/zumanur.rahman" },
  { name: "Twitter", short: "X", href: "https://twitter.com/zumanurr" },
  { name: "YouTube", short: "Yt", href: "https://www.youtube.com/channel/UCuRUKa3_0ItF-qbqo5ncWCA" },
];

export const stats = [
  { value: 1500, suffix: "+", label: "Projects Completed" },
  { value: 350, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "", label: "Years on the Market" },
  { value: 10, suffix: "", label: "Qualified Specialists" },
];

export const values = [
  {
    title: "Experienced",
    body: "An experienced team dedicatedly providing designs for more than 10 years.",
  },
  {
    title: "Conceptual",
    body: "We believe in fresh and unique design, so we always develop different concepts for every client.",
  },
  {
    title: "Client Oriented",
    body: "Client satisfaction matters most. We keep iterating until the work is up to the mark.",
  },
];

/** "The DesignJanala Development Journey" */
export const process = [
  {
    title: "Idea & Requirements",
    body: "We understand your goals, your users and the outcomes that matter before anything is designed or built.",
  },
  {
    title: "AI-Enhanced Planning",
    body: "We use AI tooling to explore options, estimate effort and shape a realistic roadmap, timeline and approach.",
  },
  {
    title: "Design & Engineering",
    body: "Designers and developers work side by side to build a scalable product using production-ready methods.",
  },
  {
    title: "Testing & QA",
    body: "Automated and manual testing make sure the product is reliable, accessible and bug-free before launch.",
  },
  {
    title: "Launch & Iteration",
    body: "We ship, measure real-world usage and keep refining the product with you after launch.",
  },
];

/** "Because Serious Products Need the Right Team" */
export const whyUs = [
  {
    title: "Product-First Engineering",
    body: "Every design and technical decision is tied to a real product outcome, not just a feature list.",
  },
  {
    title: "Growth-Ready Systems",
    body: "Design systems and infrastructure prepared for scale, so success never forces a rewrite.",
  },
  {
    title: "Human-Guided AI Decisions",
    body: "AI speeds up our work; experienced designers and engineers make the calls that matter.",
  },
];

/** "AI isn't an add-on for us" */
export const aiInProcess = [
  "AI-assisted research, competitor analysis and requirement mapping",
  "Rapid prototyping and design exploration with AI tools",
  "AI pair-programming with human code review on every change",
  "Automated testing and QA that catch issues before your users do",
];

export const industries = [
  { title: "SaaS & Startups", body: "Recurring revenue depends on retention, so onboarding, dashboards and billing have to just work." },
  { title: "Fintech", body: "Compliance isn't a checklist at the end. We design secure flows and audit trails from day one." },
  { title: "Healthcare", body: "Patient portals and clinical tools that are simple, accessible and protect sensitive data." },
  { title: "E-commerce", body: "Stores, catalogs and brand experiences that turn browsers into buyers on every device." },
  { title: "Real Estate", body: "Listing platforms, CRMs and property tools for agents, owners and buyers." },
  { title: "Ed-tech", body: "Engagement drops fast when a platform feels clunky, so we design for focus and progress." },
  { title: "Logistics", body: "Route complexity, real-time tracking and fleet data need dashboards that stay readable." },
  { title: "Media & Publishing", body: "Twelve years of editorial and print design, now applied to digital publishing products." },
];

/** "Where Others Stop, We Continue": DesignJanala vs Freelancers vs Traditional Agencies. */
export const comparison: { label: string; values: [string, string, string] }[] = [
  { label: "AI-Driven Workflow", values: ["Fully AI-accelerated", "Rarely used", "Limited AI usage"] },
  { label: "End-to-End Development", values: ["Brand, design & code in one team", "Single skill set", "Split across departments"] },
  { label: "Scalable Architecture", values: ["Built in from day one", "Often an afterthought", "Structured but slow"] },
  { label: "Dedicated Product Team", values: ["Designers + engineers + PM", "One person", "Rotating staff"] },
  { label: "Production-Ready Delivery", values: ["Tested, documented, deployed", "Varies by person", "Lengthy QA cycles"] },
  { label: "Post-Launch Support", values: ["Continuous optimisation", "Usually unavailable", "Paid change requests"] },
];

/** Technology categories, with a description for the Technology page. */
export const techStack: { category: string; body: string; items: string[] }[] = [
  {
    category: "Design",
    body: "Every product starts with a clear interface and a consistent visual system your team can extend.",
    items: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "After Effects", "Framer", "Webflow"],
  },
  {
    category: "Frontend",
    body: "Interfaces designed to feel fast and effortless on all devices.",
    items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    category: "Backend",
    body: "The logic behind every screen: requests, data and integrations that keep running exactly as expected.",
    items: ["Node.js", "Python", "Django", "FastAPI", "NestJS", "Express", "GraphQL", "Laravel", "REST API"],
  },
  {
    category: "Database",
    body: "Every piece of information your product relies on, stored safely and organised for speed.",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase", "SQLite"],
  },
  {
    category: "Mobile",
    body: "Apps that work just as well in someone's pocket as on a desktop screen.",
    items: ["iOS", "Android", "Flutter", "Dart", "Swift", "Kotlin", "React Native", "Expo"],
  },
  {
    category: "Cloud",
    body: "Infrastructure that grows with your business and stays available no matter the traffic.",
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify", "DigitalOcean", "Cloudflare"],
  },
  {
    category: "DevOps",
    body: "Automation, monitoring and pipelines that keep a product live and shipping safely.",
    items: ["Docker", "Kubernetes", "GitHub Actions", "GitLab", "Terraform", "Linux", "Git"],
  },
  {
    category: "AI",
    body: "Models, retrieval and orchestration working together to make AI features reliable.",
    items: ["OpenAI", "Anthropic", "Gemini", "LangChain", "CrewAI", "Hugging Face", "Pinecone", "Replicate"],
  },
  {
    category: "Analytics",
    body: "Understanding how people actually use your product, so every iteration is informed.",
    items: ["Google Analytics", "Mixpanel", "Amplitude", "Hotjar", "Sentry", "Meta Pixel"],
  },
];

export const toolCount = techStack.reduce((n, t) => n + t.items.length, 0);

/** "Nothing in our stack ever gets chosen by accident" (Technology page). */
export const stackPrinciples = [
  { title: "Solves the problem", body: "Before anything else, we ask whether a technology solves your product's problem, rather than picking something merely familiar." },
  { title: "Matches your team", body: "We consider who will write and maintain the code, and choose tools that match their experience." },
  { title: "Connects cleanly", body: "We check how a technology connects with the systems, hosting and services you already run, so nothing conflicts later." },
  { title: "Built to outlast", body: "We plan for the long term: active communities, good documentation and support that will still be there." },
];

/** "What to Expect from Us" */
export const expectations = [
  { title: "AI-Driven Development", body: "AI tooling across research, design and code means faster cycles." },
  { title: "Scalable Architecture", body: "Clean foundations that handle growth in users and features." },
  { title: "Transparent Communication", body: "Weekly updates and direct access to the people doing the work." },
  { title: "Human-Centered Design", body: "Twelve years of design craft make your product easy to use." },
  { title: "Full-Cycle Support", body: "From brand and strategy to launch and iteration, one team." },
  { title: "Faster Time-to-Market", body: "Focused scopes and proven processes get you live sooner." },
];

export type ServiceCategory = {
  slug: "ai" | "saas" | "mobile" | "design";
  title: string;
  blurb: string;
};

/** Service groups, mirroring the DevMonks layout: one card per group, four services each. */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "ai",
    title: "AI Automation Systems",
    blurb: "Agents, LLMs and automations that remove busywork and put your data to work.",
  },
  {
    slug: "saas",
    title: "SaaS Platform Engineering",
    blurb: "Scalable web platforms, portals and MVPs built on a modern, production-ready stack.",
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    blurb: "Native and cross-platform apps that feel fast, reliable and at home on every device.",
  },
  {
    slug: "design",
    title: "Product & Brand Design",
    blurb: "Twelve years of design craft: UI/UX, brand identity, redesigns and no-code builds.",
  },
];

export type Service = {
  slug: string;
  category: ServiceCategory["slug"];
  title: string;
  /** Short line shown under the title in the Services menu. */
  tagline: string;
  short: string;
  body: string[];
  deliverables: string[];
};

export const services: Service[] = [
  // AI Automation Systems
  {
    slug: "agentic-ai-solutions",
    category: "ai",
    title: "Agentic AI Solutions",
    tagline: "AI agents that get work done",
    short: "Autonomous AI agents that plan, use your tools and complete multi-step tasks, with humans in the loop where it matters.",
    body: [
      "Agents go beyond chat. We design AI agents that read context, call your APIs and finish real tasks: triaging tickets, qualifying leads, preparing reports or operating internal tools.",
      "Every agent ships with guardrails, evaluation and clear hand-off points, so your team stays in control of the decisions that need human judgement.",
    ],
    deliverables: ["Use-case Discovery", "Agent Architecture", "Tool & API Integration", "Guardrails & Evals", "Human-in-the-loop UX", "Monitoring"],
  },
  {
    slug: "custom-llm-solutions",
    category: "ai",
    title: "Custom LLM Solutions",
    tagline: "Language models tuned to your domain",
    short: "LLM features built around your product, data and tone of voice, from smart assistants to content and data extraction.",
    body: [
      "We pick the right model for the job (OpenAI, Anthropic, Gemini or open source) and shape it with prompting, fine-tuning and structured outputs so it behaves reliably inside your product.",
      "We design the interface around the AI too, so users understand what it can do, trust its answers and recover gracefully when it is unsure.",
    ],
    deliverables: ["Model Selection", "Prompt Engineering", "Fine-tuning", "Structured Outputs", "AI UX Design", "Cost Optimisation"],
  },
  {
    slug: "workflow-automation",
    category: "ai",
    title: "Intelligent Workflow Automation",
    tagline: "Automate the repetitive",
    short: "Connect your tools and let AI handle the repetitive steps between them, from data entry to approvals and reporting.",
    body: [
      "We map the workflows that eat your team's time, then automate them with a mix of integrations, AI classification and rules, all with clear logs and fallbacks.",
      "The result is fewer manual hand-offs, faster turnaround and people focused on work that actually needs them.",
    ],
    deliverables: ["Process Mapping", "Integrations", "AI Classification", "Document Processing", "Dashboards & Alerts", "Team Training"],
  },
  {
    slug: "rag-development",
    category: "ai",
    title: "RAG Development",
    tagline: "AI that knows your business",
    short: "Retrieval-augmented generation that grounds AI answers in your own documents, knowledge base and data.",
    body: [
      "RAG lets an AI answer from your sources rather than guessing. We build the ingestion pipeline, vector search and retrieval logic, and tune it until answers are accurate and cited.",
      "Typical uses include internal knowledge assistants, customer support bots and search across contracts, manuals or product data.",
    ],
    deliverables: ["Data Ingestion", "Vector Database", "Retrieval Tuning", "Citations & Sources", "Chat Interface", "Accuracy Evaluation"],
  },

  // SaaS Platform Engineering
  {
    slug: "saas-design",
    category: "saas",
    title: "Multi-Tenant SaaS Development",
    tagline: "SaaS built to scale",
    short: "Design and engineering for SaaS products with clean workflows, intuitive dashboards and a multi-tenant architecture that grows with you.",
    body: [
      "SaaS products live or die on clarity. We untangle complex workflows into interfaces new users understand and power users love, on top of a reusable design system.",
      "Under the hood we build secure multi-tenant foundations: accounts, roles, billing and data isolation, ready for your next thousand customers.",
    ],
    deliverables: ["Product Discovery", "Dashboard Design", "Multi-tenant Architecture", "Roles & Permissions", "Billing & Subscriptions", "Design Systems"],
  },
  {
    slug: "web-design-development",
    category: "saas",
    title: "Web & Enterprise Portals",
    tagline: "Fast, modern, maintainable",
    short: "Marketing websites, web apps and enterprise portals that communicate clearly, load fast and convert, designed and built by one team.",
    body: [
      "Your website is often the first conversation you have with a customer. We plan the content, design the experience and build it on Next.js and React.",
      "For internal and customer portals we focus on secure access, complex data and workflows that save people time. Everything ships responsive, accessible and SEO-ready.",
    ],
    deliverables: ["Information Architecture", "Website Design", "Next.js / React", "Customer Portals", "CMS Setup", "Performance & SEO"],
  },
  {
    slug: "mvp-development",
    category: "saas",
    title: "Rapid MVP Development",
    tagline: "From idea to launch in weeks",
    short: "Validate your idea quickly with a focused MVP, scoped, designed and built to learn fast without needing a rewrite later.",
    body: [
      "An MVP should answer your riskiest question with the least effort. We help you define the core feature set, design it and ship a production-ready version in weeks.",
      "Authentication, payments, dashboards and analytics are set up from day one, so you can launch, learn from real users and iterate with confidence.",
    ],
    deliverables: ["Scope Definition", "Rapid Prototyping", "MVP Design", "Full-stack Build", "Auth & Payments", "Launch Support"],
  },
  {
    slug: "backend-api-development",
    category: "saas",
    title: "Backend & API Development",
    tagline: "Solid foundations",
    short: "Secure, well-documented backends and APIs that power your web and mobile products and connect them to everything else.",
    body: [
      "We design data models and APIs that are easy to build on, using Node.js, Python, PostgreSQL and the cloud services that suit your scale.",
      "Integrations, background jobs, caching, monitoring and automated tests are part of the job, not an afterthought.",
    ],
    deliverables: ["API Design (REST / GraphQL)", "Database Design", "Third-party Integrations", "Cloud Infrastructure", "CI/CD", "Monitoring & Logging"],
  },

  // Mobile App Development
  {
    slug: "ios-app-development",
    category: "mobile",
    title: "Custom iOS Development",
    tagline: "Native iPhone & iPad apps",
    short: "Polished native iOS apps that follow Apple's conventions and feel fast on every device.",
    body: [
      "We design and build native iOS apps in Swift around the few things your users come to do, and make those moments fast and delightful.",
      "From architecture and offline support to App Store submission, we take care of the details that get an app approved and loved.",
    ],
    deliverables: ["App Strategy", "iOS UI Design", "Swift / SwiftUI", "Offline & Sync", "App Store Launch", "Analytics"],
  },
  {
    slug: "android-app-development",
    category: "mobile",
    title: "Android App Development",
    tagline: "Built for every Android device",
    short: "Reliable Android apps in Kotlin, designed with Material guidelines and tested across the devices your users carry.",
    body: [
      "Android users span thousands of devices. We design adaptive layouts and test on real hardware so your app performs everywhere.",
      "We handle Play Store setup, release tracks and crash reporting so updates go out smoothly.",
    ],
    deliverables: ["Android UI Design", "Kotlin / Jetpack Compose", "Device Testing", "Push Notifications", "Play Store Launch", "Crash Reporting"],
  },
  {
    slug: "cross-platform-development",
    category: "mobile",
    title: "Cross-Platform Development",
    tagline: "One codebase, every platform",
    short: "Ship to iOS and Android from a single Flutter or React Native codebase, without compromising on quality.",
    body: [
      "Cross-platform apps cut cost and time to market. We use Flutter or React Native and design each screen so it still feels native on both platforms.",
      "Shared logic, a shared design system and automated builds keep both stores in sync release after release.",
    ],
    deliverables: ["Flutter / React Native", "Shared Design System", "Native Modules", "Automated Builds", "Store Releases", "Maintenance"],
  },
  {
    slug: "iot-companion-apps",
    category: "mobile",
    title: "IoT Companion Apps",
    tagline: "Apps that talk to hardware",
    short: "Mobile apps that pair, control and monitor connected devices over Bluetooth, Wi-Fi and the cloud.",
    body: [
      "Hardware products are judged by their app. We design smooth pairing and setup flows, then build reliable device communication over BLE, Wi-Fi and cloud APIs.",
      "Real-time dashboards, firmware updates and alerts keep users connected to their devices.",
    ],
    deliverables: ["Pairing & Onboarding", "BLE / Wi-Fi Integration", "Real-time Dashboards", "Firmware Updates", "Cloud Sync", "Alerts"],
  },

  // Product & Brand Design
  {
    slug: "ui-ux-design",
    category: "design",
    title: "UI/UX Design",
    tagline: "Crafting intuitive experiences",
    short: "Research-led UX strategy, interaction design, usability testing and scalable UI systems that turn user needs into products people enjoy.",
    body: [
      "Good interfaces start with understanding people. We research your users, map their journeys and design flows that feel obvious the first time someone uses them.",
      "From wireframes to pixel-perfect screens and interactive prototypes, every decision is tied back to a business goal and handed off ready for development.",
    ],
    deliverables: ["User Research", "UX Strategy", "Wireframes & Flows", "UI Design", "Interactive Prototypes", "Usability Testing"],
  },
  {
    slug: "brand-design",
    category: "design",
    title: "Brand Identity Design",
    tagline: "Crafting timeless visuals",
    short: "Strategic brand identities that define how your business looks, speaks and stays recognisable across every touchpoint.",
    body: [
      "A brand is the sum of every impression you make. We define your positioning, then build a visual language (logo, type, colour, imagery) that expresses it consistently.",
      "With more than a decade designing brand identities, company profiles and corporate collateral, we make sure your brand works as hard in print as it does on screen.",
    ],
    deliverables: ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Guidelines", "Company Profile", "Marketing Collateral"],
  },
  {
    slug: "product-redesign",
    category: "design",
    title: "Product Redesign",
    tagline: "Fix what's holding you back",
    short: "Audit, redesign and rebuild existing products so they are easier to use, faster and ready for the next stage of growth.",
    body: [
      "We start with a UX and technical audit: what works today, where users struggle and what the code can support. Then we decide together what to keep, improve or rebuild.",
      "Redesigns are rolled out in phases so your users and your team are never left stranded.",
    ],
    deliverables: ["UX Audit", "Heuristic Evaluation", "Technical Review", "Redesign", "Phased Rollout", "Design System Refresh"],
  },
  {
    slug: "webflow-design-development",
    category: "design",
    title: "Webflow / Framer Development",
    tagline: "No-code, full control",
    short: "Responsive Webflow and Framer sites with reusable components, plus CMS migration, so your team controls content and growth.",
    body: [
      "Webflow and Framer let marketing teams move fast without waiting on developers. We design and build sites with clean class systems and reusable components.",
      "We set up the CMS, interactions and SEO foundations, migrate content from WordPress or other platforms, then train your team to run it.",
    ],
    deliverables: ["Webflow Development", "Framer Development", "CMS Collections", "CMS Migration", "Interactions & Animation", "Team Training"],
  },
];

export const servicesIn = (category: ServiceCategory["slug"]) => services.filter((s) => s.category === category);

export const categories = [
  { slug: "all", label: "All" },
  { slug: "branding", label: "Branding" },
  { slug: "flyer-brochure", label: "Flyer & Brochure" },
  { slug: "publication", label: "Publication" },
  { slug: "resume", label: "Resume" },
  { slug: "stationary", label: "Stationery" },
] as const;

export type Category = Exclude<(typeof categories)[number]["slug"], "all">;

export type Project = {
  title: string;
  description: string;
  image: string;
  categories: Category[];
  free?: boolean;
};

const img = (p: string) => `/images/portfolio/${p}`;

export const projects: Project[] = [
  { title: "Case Study Booklet", description: "16-page multipurpose case study template", image: img("2019-02-1.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Business Newsletter", description: "Modern and elegant InDesign newsletter", image: img("2019-02-2-4.jpg"), categories: ["flyer-brochure"] },
  { title: "Brand Identity", description: "Modern corporate brand identity system", image: img("2019-02-4-1-4.jpg"), categories: ["branding", "stationary"] },
  { title: "Product Catalog", description: "Clean product catalog template", image: img("2019-02-3-1-8.jpg"), categories: ["publication"] },
  { title: "Corporate Profile", description: "A4 corporate profile for modern companies", image: img("2019-02-1-3.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Resume", description: "Modern, professional and clean resume", image: img("2019-02-1-4.jpg"), categories: ["resume"] },
  { title: "Business Proposal", description: "16-page professional business proposal", image: img("2019-02-1-1-3.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Business Newsletter", description: "Modern and elegant InDesign newsletter", image: img("2019-02-1-1-6.jpg"), categories: ["publication"] },
  { title: "Corporate Profile", description: "Corporate profile template", image: img("2019-02-7-1-3.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Resume", description: "Modern and professional resume template", image: img("2019-02-1-2.jpg"), categories: ["resume"] },
  { title: "Business Newsletter", description: "Modern and elegant InDesign newsletter", image: img("2019-02-1-1.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Certificate", description: "Corporate and modern certificate template", image: img("2019-02-1-.jpg"), categories: ["stationary"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2019-02-3-1-2.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2019-02-screenshot-1-.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Resume / CV template", image: img("2019-02-1_1-.jpg"), categories: ["resume"] },
  { title: "Free Resume", description: "Modern, professional and clean resume", image: img("2018-10-Front.jpg"), categories: ["resume"], free: true },
  { title: "Free Resume", description: "Modern, professional and clean resume", image: img("2018-09-f1.jpg"), categories: ["resume"], free: true },
  { title: "Brand Identity", description: "Modern corporate brand identity", image: img("2018-09-01-1.jpg"), categories: ["branding"] },
  { title: "Business Newsletter", description: "Modern newsletter for business updates", image: img("2018-09-thumbnail-1.jpg"), categories: ["publication"] },
  { title: "Discount Voucher", description: "Discount and gift voucher template", image: img("2018-09-Thumbnail-11.jpg"), categories: ["branding", "stationary"] },
  { title: "Invoice", description: "Clean and modern invoice template", image: img("2018-09-Thumbnail-8.jpg"), categories: ["branding", "stationary"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-15.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-14.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-13.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-12.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-10.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-9.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-7.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-Thumbnail-6.jpg"), categories: ["resume"] },
  { title: "Invoice", description: "Clean and modern invoice template", image: img("2018-09-3-7.jpg"), categories: ["branding", "stationary"] },
  { title: "Invoice", description: "Clean and modern invoice template", image: img("2018-09-4-3.jpg"), categories: ["branding", "stationary"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-1-5.jpg"), categories: ["resume"] },
  { title: "Invoice", description: "Clean and modern invoice template", image: img("2018-09-1-4.jpg"), categories: ["branding", "stationary"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-1-3.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-1-2.jpg"), categories: ["resume"] },
  { title: "Resume", description: "Modern, clean and minimal resume", image: img("2018-09-1-1.jpg"), categories: ["resume"] },
  { title: "Business Newsletter", description: "Modern business newsletter", image: img("2018-03-thumbnail.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Brand Identity", description: "Modern corporate brand identity", image: img("2018-03-1-6.jpg"), categories: ["branding", "stationary"] },
  { title: "Brand Identity", description: "Modern corporate brand identity", image: img("2018-03-7-1.jpg"), categories: ["branding", "stationary"] },
  { title: "Business Proposal", description: "16-page professional business proposal", image: img("2018-03-ii.jpg"), categories: ["flyer-brochure", "publication"] },
  { title: "Resume", description: "Modern, professional and clean resume", image: img("2018-03-2-4.jpg"), categories: ["resume"] },
];



export const testimonials = [
  {
    quote:
      "Very responsive. Goes above and beyond to ensure that deliverables are met and the client is happy! Extremely skilled.",
    name: "Moumita Bhattacharya",
    role: "CEO, onceuponabazaar.com",
  },
  {
    quote:
      "Great work, talented and motivated. Very open with detail and creativity. Highly recommended.",
    name: "James McCarthy",
    role: "United States",
  },
  {
    quote:
      "This was a very positive experience for me. There was a big gap on our end between when we started and finished, but it all turned out great in the end. Thank you!",
    name: "Randy Domolky",
    role: "CEO, PAN, USA",
  },
  {
    quote:
      "100% satisfied. Completed on time, great communication, professional designer. Would recommend and will hire again.",
    name: "Narek Yerem",
    role: "CEO, California Auto Parts",
  },
];

export type TeamMember = { name: string; role: string; bio: string; focus: string[] };

export const team: TeamMember[] = [
  {
    name: "Zumanur Rahman",
    role: "Founder & Lead Designer",
    bio: "Started DesignJanala more than a decade ago and still leads design on every project, from brand identities to product interfaces.",
    focus: ["Brand Identity", "UI/UX", "Art Direction"],
  },
  {
    name: "Jahangir Ahmad",
    role: "Developer",
    bio: "Turns designs into fast, maintainable web and mobile products, and owns the technical decisions behind them.",
    focus: ["Next.js", "APIs", "Mobile"],
  },
  {
    name: "Forkanun Newaz",
    role: "Digital Marketer",
    bio: "Makes sure what we launch gets found: SEO, analytics and growth experiments for client products.",
    focus: ["SEO", "Analytics", "Growth"],
  },
  {
    name: "Rebeka Sultana",
    role: "Customer Relations Officer",
    bio: "Your first point of contact. Keeps projects on schedule and every client informed from kickoff to handover.",
    focus: ["Client Success", "Scheduling", "Support"],
  },
];

/** Team page: "Given the choice, we…" principles. */
export const teamPrinciples = [
  "Given the choice, we lose a day rather than ship something we wouldn't stake our name on.",
  "Given the choice, we ask one more question rather than build on an assumption.",
  "Given the choice, we keep the same people on your project from kickoff to launch.",
  "Given the choice, we say no to work we can't do well rather than say yes to everything.",
];

export const jobs = [
  { title: "UI/UX Designer", type: "Full-time", location: "Dhaka / Hybrid", team: "Design", body: "Design web and mobile products end to end, from research and flows to polished UI and design systems." },
  { title: "Frontend Developer (React / Next.js)", type: "Full-time", location: "Dhaka / Hybrid", team: "Engineering", body: "Build fast, accessible interfaces with React, Next.js and TypeScript alongside our designers." },
  { title: "Graphic Designer", type: "Full-time", location: "Dhaka", team: "Brand", body: "Create brand identities, print collateral and marketing assets for clients worldwide." },
  { title: "Design Intern", type: "Internship", location: "Dhaka / Remote", team: "Design", body: "Learn alongside our team on real client work. A strong portfolio matters more than a degree." },
];

export type Post = {
  slug: string;
  title: string;
  category: "Design" | "Development" | "AI" | "Branding";
  date: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "mvp-scope-checklist",
    title: "How to Scope an MVP Without Building Too Much",
    category: "Development",
    date: "2026-09-24",
    excerpt: "A practical checklist for deciding what goes into version one, and what can wait until real users tell you.",
    body: [
      "Most MVPs fail not because they are too small, but because they try to do too much. Every extra feature adds design, development and testing time before you learn anything from real users.",
      "Start with the single riskiest assumption in your business. Is it that people want the product? That they will pay? That the core workflow is fast enough? Your MVP should test that assumption and very little else.",
      "Write down every feature you have in mind, then mark each one as must-have, nice-to-have or later. Be honest: if users can complete the core job without it, it is not a must-have.",
      "Finally, keep the foundations solid. Authentication, payments and analytics are worth doing properly from day one, so the MVP can grow into the real product instead of being thrown away.",
    ],
  },
  {
    slug: "ai-features-users-trust",
    title: "Designing AI Features That Users Actually Trust",
    category: "AI",
    date: "2026-09-12",
    excerpt: "AI is only useful if people rely on it. Here is how we design interfaces that make AI output understandable and safe.",
    body: [
      "Adding an AI feature is easy. Getting people to trust it is hard. Users need to understand what the AI can do, where its answers come from and what to do when it is wrong.",
      "Show sources whenever possible. Retrieval-augmented answers with citations let users verify claims in a click, which builds confidence much faster than a confident tone.",
      "Design for uncertainty. Let the AI say it does not know, offer a fallback path and make it easy to correct or undo anything it does on the user's behalf.",
      "Keep humans in the loop for decisions with real consequences. Automation should prepare the work; people should approve it.",
    ],
  },
  {
    slug: "brand-identity-for-startups",
    title: "Brand Identity for Startups: What You Really Need on Day One",
    category: "Branding",
    date: "2026-08-28",
    excerpt: "You don't need a 60-page brand book to launch. You need a few decisions made well and applied consistently.",
    body: [
      "Early-stage companies often either skip branding entirely or overspend on it. The right answer is in between: a small, solid identity that can grow.",
      "On day one you need a clear name and positioning, a logo that works small and large, a type pairing, a colour palette and a handful of templates for the things you make most often.",
      "Consistency matters more than complexity. A simple identity applied everywhere looks more professional than an elaborate one used inconsistently.",
      "Document the basics in a short guideline so everyone on the team, and every freelancer you hire, can apply the brand correctly.",
    ],
  },
  {
    slug: "saas-dashboard-design",
    title: "SaaS Dashboard Design: Turning Data Into Decisions",
    category: "Design",
    date: "2026-08-14",
    excerpt: "Dashboards should answer questions, not display every number you have. A framework for designing ones people use.",
    body: [
      "A dashboard is not a place to show all your data. It is a place to answer the questions your users ask every day.",
      "Start by listing those questions. Then design each widget to answer one of them, with the most important answer at the top left where the eye lands first.",
      "Use comparison to give numbers meaning: against last week, against a goal or against the average. A number on its own rarely tells anyone what to do.",
      "Finally, link every insight to an action. If a metric is off, the user should be one click away from fixing it.",
    ],
  },
  {
    slug: "nextjs-vs-webflow",
    title: "Next.js or Webflow? Choosing the Right Platform for Your Website",
    category: "Development",
    date: "2026-07-30",
    excerpt: "Both are excellent. The right choice depends on who will update the site and what it needs to do.",
    body: [
      "Webflow is ideal when your marketing team needs to publish and edit pages without developers. It has a visual editor, a capable CMS and solid hosting built in.",
      "Next.js is the better fit when your website is part of a product: logged-in areas, complex integrations, personalised content or very large page counts.",
      "Many companies use both: Webflow for the marketing site and Next.js for the app. What matters is that the two share one design system so the experience feels seamless.",
      "If you are unsure, start by listing who will update the site and how often. That answer usually makes the decision for you.",
    ],
  },
  {
    slug: "rag-explained",
    title: "RAG Explained: Giving AI Access to Your Company Knowledge",
    category: "AI",
    date: "2026-07-16",
    excerpt: "Retrieval-augmented generation lets an AI answer from your own documents. Here is how it works and when to use it.",
    body: [
      "Large language models know a lot about the world but nothing about your business. Retrieval-augmented generation, or RAG, fixes that by fetching relevant documents before the model answers.",
      "Your documents are split into chunks, converted into embeddings and stored in a vector database. When someone asks a question, the most relevant chunks are retrieved and passed to the model as context.",
      "The quality of a RAG system depends mostly on the retrieval step: how documents are chunked, which search method is used and how results are ranked.",
      "Common uses include internal knowledge assistants, customer support bots and search across contracts, manuals or product data.",
    ],
  },
  {
    slug: "product-redesign-signs",
    title: "5 Signs Your Product Needs a Redesign",
    category: "Design",
    date: "2026-07-02",
    excerpt: "Redesigns are expensive, so do them for the right reasons. These are the signals worth acting on.",
    body: [
      "Support tickets keep asking how to do basic tasks. If users can't find core features, the interface is getting in their way.",
      "New features don't fit anywhere. When every addition needs a new menu or page, the information architecture has outgrown the product.",
      "Your brand has moved on but the product hasn't. A mismatch between marketing and product erodes trust.",
      "Conversion or activation is dropping while traffic holds steady, and the codebase makes small UI changes slow and risky. Any of these is worth a proper audit before you decide to rebuild.",
    ],
  },
  {
    slug: "design-systems-small-teams",
    title: "Design Systems for Small Teams",
    category: "Design",
    date: "2026-06-18",
    excerpt: "You don't need a dedicated design-system team to benefit from one. Start small and grow it with the product.",
    body: [
      "A design system is simply a shared set of decisions: colours, type, spacing and components, documented once and reused everywhere.",
      "Small teams benefit the most, because every hour saved on rebuilding a button or a form is an hour spent on the product.",
      "Start with tokens and the ten components you use most. Name them the same way in Figma and in code, so designers and developers speak the same language.",
      "Grow the system only when a pattern repeats three times. That keeps it small, useful and up to date.",
    ],
  },
  {
    slug: "print-to-product",
    title: "From Print to Product: What Editorial Design Teaches UI",
    category: "Branding",
    date: "2026-06-04",
    excerpt: "Twelve years of designing brochures, catalogs and proposals shaped how we design digital products.",
    body: [
      "Before we designed apps, we designed company profiles, catalogs and proposals. Print taught us lessons that apply directly to UI.",
      "Hierarchy comes first. A reader skims a page in seconds, just like a user scans a screen. Clear headings and generous spacing guide the eye.",
      "Grids create calm. Consistent columns and alignment make complex information feel organised, on paper and on screen.",
      "Typography carries the brand. Most of any interface is text, and choosing and setting type well does more for the brand than any illustration.",
    ],
  },
];

export const postCategories = ["All Posts", "Design", "Development", "AI", "Branding"] as const;

export const faqs = [
  {
    q: "What services does DesignJanala offer?",
    a: "We design and build digital products end to end: AI automation (agents, custom LLMs, RAG and workflow automation), SaaS platforms, web apps and portals, MVPs, iOS, Android and cross-platform apps, plus UI/UX design, brand identity, product redesigns and Webflow / Framer sites.",
  },
  {
    q: "Can DesignJanala help build an MVP for a startup?",
    a: "Yes. We help you define the smallest feature set that tests your idea, design it and ship a production-ready MVP in weeks, with authentication, payments and analytics set up so you can grow from it rather than rewrite it.",
  },
  {
    q: "Do you develop both web and mobile applications?",
    a: "Yes. We build web apps and portals with React and Next.js, native iOS and Android apps, and cross-platform apps with Flutter or React Native, all backed by APIs and infrastructure we design for scale.",
  },
  {
    q: "How long does a software development project take?",
    a: "A marketing website or brand identity typically takes a few weeks. MVPs usually take 6 to 12 weeks, and larger SaaS platforms or apps take a few months. We agree on phases and a timeline after a short discovery call.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on scope, complexity and timeline. After discovery we send a proposal with recommended deliverables, timeline and cost, with full transparency and no hidden fees.",
  },
  {
    q: "How can I start a project with DesignJanala?",
    a: `Fill in the contact form or email ${site.emails.project}. We'll schedule a strategy call, understand your goals and come back with a plan and proposal.`,
  },
];

export const servicesFaqs = [
  { q: "Which services can I combine in one project?", a: "Any of them. Most projects combine design and development, and many add brand identity or AI features. One team handles the whole scope, so nothing falls between vendors." },
  { q: "Can you improve an existing website or app instead of building from scratch?", a: "Yes. We start with a UX and technical audit, then decide together what to keep, improve or rebuild, and roll changes out in phases." },
  { q: "How do you estimate cost and delivery time?", a: "After a short discovery call we break the scope into phases and send a proposal with deliverables, timeline and cost, with no hidden fees." },
  { q: "Who owns the code and designs?", a: "You do. Source code, design files and documentation are handed over in full when the project is paid for." },
  { q: "Do you provide support after launch?", a: "Yes. We offer ongoing maintenance, monitoring and iteration retainers so your product keeps improving after launch." },
];

export const blogFaqs = [
  { q: "What topics does the DesignJanala blog cover?", a: "Product design, branding, web and mobile development, and practical AI, written from the work we do with clients." },
  { q: "Who are the guides written for?", a: "Founders, product managers and in-house teams who want to make better decisions about design and technology." },
  { q: "Can I suggest a topic?", a: `Yes. Email ${site.emails.project} with the question you would like answered and we will consider it for a future article.` },
  { q: "Can DesignJanala help apply a guide to my project?", a: "Absolutely. Book a strategy call and we will look at how the ideas apply to your product specifically." },
];

export const teamFaqs = [
  { q: "Who works on my project?", a: "A small, dedicated team of designers and developers, led by the same people from kickoff to launch. You talk to them directly." },
  { q: "Can I speak with the team before starting?", a: "Yes. The strategy call is with the people who would actually work on your project, not a sales team." },
  { q: "How does your team collaborate with my in-house team?", a: "We join your tools and rituals (Slack, Jira, Figma, GitHub) and work as an extension of your team." },
  { q: "How can I apply to join DesignJanala?", a: `Send your CV and portfolio to ${site.emails.career}. We review every application.` },
];

export const freebieFaqs = [
  { q: "What kind of freebies are available?", a: "Professionally designed templates such as resumes, invoices and stationery, made by our design team." },
  { q: "Can I use these templates commercially?", a: "Yes, for your own business and client work. Please don't resell or redistribute the files as templates." },
  { q: "Which software do I need?", a: "Most templates are made in Adobe InDesign, Illustrator or Photoshop. Check each template's description." },
  { q: "Can DesignJanala customise a template for me?", a: `Yes. Email ${site.emails.sample} with what you need and we'll send a quote.` },
];

export type OpenProject = {
  slug: string;
  category: "Templates" | "Design Resources" | "Learning";
  title: string;
  body: string;
  /** Format chip shown bottom-left of the card. */
  format: string;
  href: string;
  cta: string;
  /** Secondary link, shown under the featured card. */
  secondary?: { label: string; href: string };
  image?: string;
};

/**
 * Open Source page directory. These are real, publicly available DesignJanala resources.
 * Add GitHub repositories here as they are published (category, title, format = language, href = repo URL).
 */
export const openSource: OpenProject[] = [
  {
    slug: "free-resume-template",
    category: "Templates",
    title: "free_resume_template",
    body: "A modern, professional and clean resume template. Free for personal and commercial use, with editable type, colours and layout.",
    format: "Print",
    href: `mailto:${site.emails.sample}?subject=${encodeURIComponent("Free template: Resume")}`,
    cta: "Get the files",
    secondary: { label: "View all freebies", href: "/freebies" },
    image: "/images/portfolio/2018-10-Front.jpg",
  },
  {
    slug: "free-resume-modern",
    category: "Templates",
    title: "free_resume_modern",
    body: "A second free resume layout with a bold header and a clear two-column structure.",
    format: "Print",
    href: `mailto:${site.emails.sample}?subject=${encodeURIComponent("Free template: Modern resume")}`,
    cta: "Get the files",
    image: "/images/portfolio/2018-09-f1.jpg",
  },
  {
    slug: "design-classroom",
    category: "Learning",
    title: "design_classroom",
    body: "Free graphic design video classes on our YouTube channel. Learn at your own pace, from basics to freelancing.",
    format: "Video",
    href: "https://www.youtube.com/channel/UCuRUKa3_0ItF-qbqo5ncWCA",
    cta: "Watch classes",
  },
  {
    slug: "creative-market-collection",
    category: "Design Resources",
    title: "creative_market",
    body: "Our full template collection: brand identities, proposals, newsletters, catalogs and resumes.",
    format: "Templates",
    href: "https://creativemarket.com/designjanala",
    cta: "View collection",
  },
  {
    slug: "graphicriver-portfolio",
    category: "Design Resources",
    title: "graphicriver_portfolio",
    body: "Print-ready corporate templates, from company profiles and certificates to invoices and vouchers.",
    format: "Print",
    href: "https://graphicriver.net/user/zumanuruzzal/portfolio",
    cta: "View portfolio",
  },
  {
    slug: "offline-design-course",
    category: "Learning",
    title: "offline_design_course",
    body: "Hands-on classes in Dhaka with our designers, from fundamentals to a freelancing-ready portfolio.",
    format: "Course",
    href: `mailto:${site.emails.career}?subject=${encodeURIComponent("Offline course admission")}`,
    cta: "Ask about admission",
  },
];

export const openSourceFaqs = [
  { q: "What kinds of resources are featured?", a: `Free design templates, our template collections on Creative Market and GraphicRiver, and free and offline design classes, all made by the ${site.name} team.` },
  { q: "Can I use these resources in a commercial project?", a: "Free templates can be used in personal and commercial work. Premium templates follow the licence of the marketplace you buy them from. Please don't resell or redistribute the source files." },
  { q: "How do I report a problem with a file?", a: `Email ${site.emails.sample} with the resource name and what went wrong, and we'll send a fixed version.` },
  { q: "How do I know whether a template fits my project?", a: "Check the preview and description on each card. If you're unsure, ask us and we'll suggest the closest match." },
  { q: "Can DesignJanala customise a resource for my brand?", a: "Yes. We can adapt any template to your brand, or design a complete identity or product from it." },
];
