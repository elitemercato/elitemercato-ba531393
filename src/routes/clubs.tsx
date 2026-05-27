import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trophy, MapPin, Calendar, Building2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/em-i18n";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "الأندية الشريكة — Elite Mercato" },
      { name: "description", content: "تعرّف على الأندية الجزائرية المحترفة الشريكة لمنصة Elite Mercato." },
      { property: "og:title", content: "الأندية الشريكة — Elite Mercato" },
      { property: "og:description", content: "شبكة الأندية الجزائرية على منصة Elite Mercato." },
    ],
  }),
  component: ClubsPage,
});

type Club = {
  id: string;
  name: string;
  city: string | null;
  league: string | null;
  founded_year: number | null;
  stadium: string | null;
  logo_url: string | null;
};

function ClubsPage() {
  const { lang } = useLang();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("clubs")
      .select("id,name,city,league,founded_year,stadium,logo_url")
      .order("founded_year", { ascending: true, nullsFirst: false })
      .then(({ data }) => {
        setClubs((data as Club[]) ?? []);
        setLoading(false);
      });
  }, []);

  const title = lang === "fr" ? "Clubs partenaires" : lang === "en" ? "Partner Clubs" : "الأندية الشريكة";
  const subtitle =
    lang === "fr"
      ? "Un réseau de clubs professionnels algériens présents sur Elite Mercato"
      : lang === "en"
      ? "A network of professional Algerian clubs on Elite Mercato"
      : "شبكة من الأندية الجزائرية المحترفة المتواجدة على منصة Elite Mercato";
  const founded = lang === "fr" ? "Fondé en" : lang === "en" ? "Founded" : "تأسس عام";

  return (
    <div className="min-h-[calc(100vh-4rem)]" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/15 via-background to-accent/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_85%_75%,oklch(var(--accent)/0.18),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold tracking-wide mb-4">
            <Trophy size={14} />
            ELITE PARTNERS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-3">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">{subtitle}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="animate-spin" size={28} />
          </div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {lang === "ar" ? "لا توجد أندية بعد." : lang === "fr" ? "Aucun club pour l'instant." : "No clubs yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clubs.map((c) => (
              <article
                key={c.id}
                className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_oklch(var(--primary)/0.45)] transition-all"
              >
                {/* Accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-gold to-accent opacity-80" />

                <div className="p-5 flex items-start gap-4">
                  <div className="shrink-0 w-20 h-20 rounded-xl bg-white/95 border border-border flex items-center justify-center overflow-hidden shadow-sm">
                    {c.logo_url ? (
                      <img
                        src={c.logo_url}
                        alt={c.name}
                        className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform"
                        loading="lazy"
                      />
                    ) : (
                      <Building2 className="text-primary" size={32} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-base sm:text-lg text-foreground leading-tight mb-1 truncate">
                      {c.name}
                    </h2>
                    {c.league && (
                      <p className="text-[11px] font-semibold text-gold uppercase tracking-wider mb-2 line-clamp-1">
                        {c.league}
                      </p>
                    )}
                    {c.city && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-accent" />
                        {c.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 space-y-2 border-t border-border/60 mt-2 bg-background/30">
                  {c.stadium && (
                    <div className="flex items-center gap-2 text-xs text-foreground/80 pt-3">
                      <Building2 size={13} className="text-primary shrink-0" />
                      <span className="truncate">{c.stadium}</span>
                    </div>
                  )}
                  {c.founded_year && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={13} className="text-gold shrink-0" />
                      <span>
                        {founded} <span className="font-semibold text-foreground">{c.founded_year}</span>
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
