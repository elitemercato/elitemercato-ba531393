import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Crown, Flame, MapPin, Play, Star } from "lucide-react";
import { formatDZD, PLAYERS, playerClub, playerName, playerWilaya } from "@/lib/em-data";
import { useLang } from "@/lib/em-i18n";
import { RequireAuth } from "@/components/em/RequireAuth";

export const Route = createFileRoute("/player/$id")({
  component: () => <RequireAuth><PlayerView /></RequireAuth>,
  notFoundComponent: () => (
    <div className="max-w-md mx-auto py-24 text-center">
      <h1 className="text-2xl font-bold">Player not found</h1>
      <Link to="/dashboard" className="mt-4 inline-block text-primary underline">Back to dashboard</Link>
    </div>
  ),
  loader: ({ params }) => {
    const p = PLAYERS.find(x => String(x.id) === params.id);
    if (!p) throw notFound();
    return { player: p };
  },
});

function PlayerView() {
  const { player: p } = Route.useLoaderData();
  const { t, lang } = useLang();
  const name = playerName(p, lang);
  const club = playerClub(p, lang);
  const wilaya = playerWilaya(p, lang);
  const pos = t.positions[p.position];

  const phys = [
    { label: t.height, value: `${p.height} cm` },
    { label: t.weight, value: `${p.weight} kg` },
    { label: t.foot, value: p.foot === "R" ? (lang === "ar" ? "يمين" : lang === "fr" ? "Droite" : "Right") : (lang === "ar" ? "يسار" : lang === "fr" ? "Gauche" : "Left") },
    { label: t.nationality, value: "🇩🇿 " + p.nationality },
  ];
  const radar = [
    { label: lang === "ar" ? "التمريرات" : lang === "fr" ? "Passes" : "Passing", val: 78 },
    { label: lang === "ar" ? "الدفاع" : lang === "fr" ? "Défense" : "Defense", val: 55 },
    { label: lang === "ar" ? "السرعة" : lang === "fr" ? "Vitesse" : "Speed", val: 86 },
    { label: lang === "ar" ? "الهجوم" : lang === "fr" ? "Attaque" : "Shooting", val: 82 },
    { label: lang === "ar" ? "الدريبل" : lang === "fr" ? "Dribble" : "Dribbling", val: 80 },
    { label: lang === "ar" ? "التمركز" : lang === "fr" ? "Position" : "Positioning", val: 74 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={14} className={lang === "ar" ? "rotate-180" : ""} /> {t.backDash}
      </Link>

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-border p-8 bg-gradient-to-br from-primary/20 via-card to-card">
        <div className="absolute inset-0 -z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_oklch(0.78_0.13_87/0.4),_transparent_60%)]" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-extrabold text-3xl text-primary-foreground shadow-[var(--shadow-elite)]">
            {p.img}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">{p.position}</span>
              <span className="text-sm text-muted-foreground">{club}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{name}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1"><MapPin size={13} /> {wilaya}</span>
              <span>{p.age} {t.yrs}</span>
              <span className="inline-flex items-center gap-1 text-gold"><Star size={13} fill="currentColor" /> {p.rating}</span>
            </div>
          </div>
          <div className="text-right md:text-end">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.marketValue}</div>
            <div className="text-3xl font-extrabold text-gold">{formatDZD(p.value)}</div>
            <div className="text-xs text-muted-foreground">{t.dzd}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Physical */}
        <Card title={t.physicalStats}>
          <div className="grid grid-cols-2 gap-3">
            {phys.map(s => (
              <div key={s.label} className="rounded-xl bg-background/60 border border-border px-4 py-3">
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
                <div className="font-bold mt-0.5">{s.value}</div>
              </div>
            ))}
            <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
              <div className="text-[11px] text-muted-foreground">{t.goals}</div>
              <div className="font-bold mt-0.5 text-primary">{p.goals}</div>
            </div>
            <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
              <div className="text-[11px] text-muted-foreground">{t.assists}</div>
              <div className="font-bold mt-0.5 text-primary">{p.assists}</div>
            </div>
          </div>
        </Card>

        {/* Radar bars */}
        <Card title={lang === "ar" ? "معدلات الأداء" : lang === "fr" ? "Performances" : "Performance Rates"}>
          <div className="space-y-3">
            {radar.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-bold">{s.val}</span>
                </div>
                <div className="h-2 rounded-full bg-background overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold" style={{ width: `${s.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tactical */}
        <Card title={t.tacticalRole}>
          <div className="rounded-xl bg-background/60 border border-border p-4">
            <div className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 mb-3">{pos}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "ar" ? "يتمركز بشكل رئيسي في المنطقة الهجومية، مع حركة واسعة على المحور المركزي وتواجد قوي داخل منطقة الجزاء."
                : lang === "fr" ? "Se positionne principalement dans la zone offensive, avec une large mobilité sur l'axe central et forte présence dans la surface."
                : "Primarily positions in the attacking zone, with wide mobility across the central axis and strong presence inside the penalty box."}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-gold">
              <Flame size={12} /> {lang === "ar" ? "شكل رائع هذا الموسم" : lang === "fr" ? "Forme excellente cette saison" : "Excellent form this season"}
            </div>
          </div>
        </Card>

        {/* Video */}
        <Card title={t.highlights}>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-video rounded-xl bg-gradient-to-br from-background to-primary/10 border border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Play size={16} className="ml-0.5" />
                </div>
                <span className="text-xs">Highlight #{i}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upgrade CTA */}
      <div className="mt-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent p-6 flex flex-col md:flex-row items-center gap-5">
        <Crown size={42} className="text-gold shrink-0" />
        <div className="flex-1 text-center md:text-start">
          <h3 className="font-bold text-lg text-gold">{t.upgradeTitle}</h3>
          <p className="text-sm text-muted-foreground">{t.upgradeDesc}</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl font-bold text-gold-foreground bg-gradient-to-r from-gold to-amber-500 hover:opacity-90">
          {t.upgradeBtn}
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}
