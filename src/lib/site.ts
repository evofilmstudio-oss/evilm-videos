/* Studio contacts and media. Fill in the empty values when they are ready. */
export const SITE = {
  name: "Evofilm Studio",
  // Absolute address for canonical links, sitemap and link-preview images (Telegram/Slack need
  // a full public URL). Set NEXT_PUBLIC_SITE_URL; on Vercel the production domain is used otherwise.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "https://evofilm.studio"
  ).replace(/\/$/, ""),
  phone: "40772200188", // WhatsApp and phone, digits only
  email: "evofilm.studio@gmail.com",
  tiktok: "https://www.tiktok.com/@evofilm.studio",
  instagram: "https://www.instagram.com/evofilm.studio/",
  youtube: "", // channel link, empty hides the icon
  telegram: "", // t.me/... link, empty hides the icon
  introVideo: "", // YouTube ID of the vertical intro video
  heroVideo: "", // YouTube ID of the 16:9 hero background
  ga4: process.env.NEXT_PUBLIC_GA4 || "", // e.g. "G-XXXXXXX", loaded only after consent
  city: "Bucharest",
  geo: { lat: 44.4268, lng: 26.1025 },
} as const;

export type WorkCategory = "ads" | "reels" | "talk" | "wed" | "biz" | "food";

/* Portfolio. yt = YouTube ID (Shorts or regular); empty shows a placeholder card.
   For direct MP4 URLs, use full https:// URL. */
export const WORKS: { id: string; cat: WorkCategory; yt: string; name: string }[] = [
  { id: "01", cat: "reels", yt: "", name: "Cafenea · Behind the scenes" },
  { id: "02", cat: "ads", yt: "", name: "Spot comercial" },
  { id: "03", cat: "talk", yt: "", name: "Expert · Interviu" },
  { id: "04", cat: "wed", yt: "", name: "Povestea zilei" },
  { id: "05", cat: "reels", yt: "", name: "Salon · Transformare" },
  { id: "06", cat: "biz", yt: "", name: "Film corporativ" },
  // Food portfolio videos (MP4 from GitHub)
  { id: "07", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/1.mp4", name: "Food · 1" },
  { id: "08", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/2.mp4", name: "Food · 2" },
  { id: "09", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/3.mp4", name: "Food · 3" },
  { id: "10", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/4.mp4", name: "Food · 4" },
  { id: "11", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/5.2.mp4", name: "Food · 5" },
  { id: "12", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/6.mp4", name: "Food · 6" },
  { id: "13", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/Копия%20Burger_Final.mp4", name: "Burger" },
  { id: "14", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/крЭвЭтка1.2.mp4", name: "Креветка" },
  { id: "15", cat: "food", yt: "https://raw.githubusercontent.com/evilmstudio-oss/evilm-videos/main/с%20икрой2.mp4", name: "С икрой" },
];

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
