"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { WORKS, type WorkCategory } from "@/lib/site";
import { cn } from "@/lib/ui";
import { PlayIcon } from "../icons";
import { Reveal } from "../motion/Reveal";
import { useSite } from "../SiteProvider";

type Filter = "all" | WorkCategory;
const FILTERS: Filter[] = ["all", "ads", "reels", "talk", "wed", "biz", "food"];
const SPRING = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 } as const;

// Helper to check if yt field is a direct URL (not a YouTube ID)
const isDirectUrl = (yt: string) => yt.startsWith("http://") || yt.startsWith("https://");

export function Work() {
  const { d, openVideo } = useSite();
  const w = d.work;
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const items = WORKS.filter((x) => filter === "all" || x.cat === filter);

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="wrap">
        <Reveal className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{w.eyebrow}</p>
            <h2 id="work-title" className="h2">
              {w.title}
            </h2>
          </div>

          {/* Pills keep one font weight and no border, so switching never changes their size;
              the yellow background slides between them instead. */}
          <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
            <div role="radiogroup" aria-label={w.filterLabel} className="inline-flex gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/[0.06]">
              {FILTERS.map((f) => {
                const on = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={(e) => {
                      setFilter(f);
                      e.currentTarget.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "nearest", block: "nearest" });
                    }}
                    className={cn(
                      "relative isolate shrink-0 cursor-pointer rounded-full px-4 py-2 text-[0.88rem] font-semibold whitespace-nowrap outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand",
                      on ? "text-ink" : "text-mute hover:text-paper",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand"
                        transition={reduce ? { duration: 0 } : SPRING}
                      />
                    )}
                    {w.filters[f]}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <LayoutGroup>
          <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((x, i) => (
                <motion.li
                  key={x.id}
                  layout
                  initial={reduce ? false : { opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0, transition: { ...SPRING, delay: i * 0.03 } }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={SPRING}
                >
                  <button
                    type="button"
                    onClick={() => openVideo(x.yt)}
                    aria-label={`${w.cats[x.cat]} — ${x.name}`}
                    className="glow group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[18px] text-left transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ ["--bgc" as string]: "#141414" }}
                  >
                    {isDirectUrl(x.yt) ? (
                      // Direct MP4 URL — show video thumbnail from first frame or placeholder
                      <>
                        <video
                          src={x.yt}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          preload="metadata"
                        />
                        <span className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      </>
                    ) : x.yt ? (
                      // YouTube ID — show thumbnail
                      <Image
                        src={`https://i.ytimg.com/vi/${x.yt}/hqdefault.jpg`}
                        alt=""
                        fill
                        sizes="(min-width:1280px) 200px, (min-width:768px) 30vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      // Empty — placeholder
                      <>
                        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_30%,rgb(239_189_38/0.18),transparent_70%)]" />
                        <span aria-hidden className="absolute inset-0 grid place-items-center font-head text-[2.6rem] font-extrabold text-white/[0.07]">
                          {x.id}
                        </span>
                      </>
                    )}
                    <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border border-white/15 bg-black/55 text-brand transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon className="ml-0.5 size-4" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/90 p-4">
                      <span className="block text-[0.7rem] font-semibold tracking-[0.14em] text-brand uppercase">{w.cats[x.cat]}</span>
                      <span className="mt-1.5 block font-head text-[0.92rem] leading-tight">{x.name}</span>
                      {!x.yt && !isDirectUrl(x.yt) && <span className="mt-1 block text-[0.72rem] text-mute">{w.soon}</span>}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <AnimatePresence>
            {items.length === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 text-center text-mute">
                {w.empty}
              </motion.p>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
