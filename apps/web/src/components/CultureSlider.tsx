"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { art } from "@/data/site";
import "swiper/css";
import "swiper/css/effect-fade";

interface CultureSliderProps {
  principles: string[];
}

const navItems = [
  { num: "01", cat: "CRAFT", label: "Ship it right", image: art("culture-craft") },
  { num: "02", cat: "LEARNING", label: "Keep learning", image: art("culture-learning") },
  { num: "03", cat: "COLLABORATION", label: "Work together", image: art("culture-collaboration") },
  { num: "04", cat: "OWNERSHIP", label: "Own the outcome", image: art("culture-ownership") },
];

export default function CultureSlider({ principles }: CultureSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="relative h-screen min-h-[600px] w-full bg-night text-white flex flex-col border-y border-white/10">
      <div className="flex-1 relative w-full h-full">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {principles.map((p, i) => (
            <SwiperSlide key={i} className="w-full h-full">
              <div className="relative w-full h-full flex flex-col justify-center">
                <div className="absolute inset-0" aria-hidden="true">
                  <Image src={navItems[i % navItems.length].image} alt="" fill sizes="100vw" className="object-cover object-right" />
                  <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="container-x relative z-10 w-full max-w-3xl pl-0 md:pl-12 lg:pl-24">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-6">[ culture ]</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.2] tracking-tight text-white shadow-black drop-shadow-lg">
                    {p}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Navigation */}
      <div className="relative border-t border-white/10 bg-night z-20">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
          {navItems.map((v, i) => {
            const isActive = activeIndex === i;
            return (
              <button 
                key={v.num} 
                onClick={() => swiperInstance?.slideTo(i)}
                className={`text-left p-6 lg:p-8 flex flex-col gap-2 transition-colors duration-300 ${
                  isActive ? "bg-white/5" : "hover:bg-white/5"
                }`}
              >
                <p className={`font-mono text-[10px] sm:text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-white/40"
                }`}>
                  [ {v.num} - {v.cat} ]
                </p>
                <p className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/40"
                }`}>{v.label}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
