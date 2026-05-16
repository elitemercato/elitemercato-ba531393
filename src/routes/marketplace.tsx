import { createFileRoute } from "@tanstack/react-router";
import { Activity, BarChart2, Briefcase, FileText, Play, Star, Target } from "lucide-react";
import { useState } from "react";
import { formatDZD, SERVICES } from "@/lib/em-data";
import { useLang } from "@/lib/em-i18n";

const ICONS = { legal: FileText, tactical: Target, medical: Activity, media: Play, report: BarChart2, transfer: Briefcase };

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Elite Mercato" },
      { name: "description", content: "Trusted Algerian sports services: legal, coaching, medical, and media." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<string>("all");

  const cats = [
    { key: "all", label: lang === "ar" ? "الكل" : lang === "fr" ? "Tout" : "All" },
    { key: "legal", label: lang === "ar" ? "قانوني" : lang === "fr" ? "Juridique" : "Legal" },
    { key: "coaching", label: lang === "ar" ? "تدريب" : "Coaching" },
    { key: "medical", label: lang === "ar" ? "طبي" : lang === "fr" ? "Médical" : "Medical" },
    { key: "media", label: lang === "ar" ? "إعلامي" : lang === "fr" ? "Médias" : "Media" },
  ];

  const filtered = SERVICES.filter(s => tab === "all" || s.category === tab);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">{t.marketTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.marketSub}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map(c => {
          const active = tab === c.key;
          return (
            <button key={c.key} onClick={() => setTab(c.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${active ? "bg-primary text-primary-foreground shadow-[var(--shadow-elite)]" : "bg-white/5 text-muted-foreground border border-border hover:text-foreground"}`}>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => {
          const Icon = ICONS[s.iconKey];
          const title = lang === "ar" ? s.title : lang === "fr" ? s.titleFr : s.titleEn;
          const provider = lang === "ar" ? s.provider : lang === "fr" ? s.providerFr : s.providerEn;
          const badge = lang === "ar" ? s.badge : lang === "fr" ? s.badgeFr : s.badgeEn;
          return (
            <div key={s.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-[var(--shadow-elite)] transition-all">
              <div className={`bg-gradient-to-br ${s.color} p-5 flex items-start justify-between`}>
                <div className="h-12 w-12 rounded-xl bg-black/30 backdrop-blur flex items-center justify-center text-white">
                  <Icon size={22} />
                </div>
                {badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/40 text-white backdrop-blur">{badge}</span>
                )}
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold leading-snug">{title}</h3>
                <p className="text-xs text-muted-foreground">{provider}</p>
                <div className="flex items-center gap-1.5 text-xs">
                  <Star size={12} className="text-gold" fill="currentColor" />
                  <span className="font-bold">{s.rating}</span>
                  <span className="text-muted-foreground">· {s.reviews} {t.reviews}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <div className="text-lg font-extrabold text-gold">{formatDZD(s.price)}</div>
                    <div className="text-[10px] text-muted-foreground -mt-0.5">{t.dzd}</div>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                    {t.bookNow}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
