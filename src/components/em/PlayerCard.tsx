import { Link } from "@tanstack/react-router";
import { Lock, MapPin, Star } from "lucide-react";
import { formatDZD, playerClub, playerName, playerWilaya, type Player } from "@/lib/em-data";
import { useLang } from "@/lib/em-i18n";

const posColor: Record<string, string> = {
  ST: "bg-red-500/20 text-red-300 border-red-500/30",
  CM: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  CB: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  GK: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  RW: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  LB: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

export function PlayerCard({ p }: { p: Player }) {
  const { lang, t } = useLang();
  return (
    <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-[var(--shadow-elite)]">
      <div className="relative p-5 border-b border-border bg-gradient-to-br from-primary/15 via-primary/5 to-transparent overflow-hidden">
        <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
            {p.photo ? (
              <img
                src={p.photo}
                alt={playerName(p, lang)}
                className="relative h-20 w-20 rounded-2xl object-cover object-top ring-2 ring-primary/40 shadow-[var(--shadow-elite)]"
              />
            ) : (
              <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-extrabold text-xl text-primary-foreground ring-2 ring-primary/40">
                {p.img}
              </div>
            )}
            <span className={`absolute -bottom-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md border shadow-md ${posColor[p.position]}`}>{p.position}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-lg text-foreground truncate leading-tight">{playerName(p, lang)}</h3>
            <div className="text-xs text-muted-foreground truncate mt-1">{playerClub(p, lang)}</div>
            <div className="flex items-center gap-1 mt-2 text-gold">
              <Star size={12} fill="currentColor" />
              <span className="font-bold text-sm">{p.rating}</span>
              <span className="text-[10px] text-muted-foreground ml-1">{t.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><div className="font-bold text-sm">{p.age}</div><div className="text-[10px] text-muted-foreground">{t.age}</div></div>
          <div><div className="font-bold text-sm">{p.goals}</div><div className="text-[10px] text-muted-foreground">{t.goals}</div></div>
          <div><div className="font-bold text-sm">{p.assists}</div><div className="text-[10px] text-muted-foreground">{t.assists}</div></div>
          <div className="flex flex-col items-center justify-center">
            <MapPin size={12} className="text-muted-foreground" />
            <div className="text-[10px] text-muted-foreground truncate w-full">{playerWilaya(p, lang)}</div>
          </div>
        </div>

        <div className="flex items-baseline justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">{t.marketValue}</span>
          <div className="text-gold font-bold">
            {formatDZD(p.value)} <span className="text-[10px]">{t.dzd}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-white/5 rounded-lg px-2.5 py-1.5">
          <Lock size={11} />
          <span className="truncate">{t.contactHidden}</span>
          <span className="ml-auto tracking-widest opacity-60">●●● ●●●</span>
        </div>

        <div className="flex gap-2 pt-1">
          <Link to="/player/$id" params={{ id: String(p.id) }}
            className="flex-1 text-center py-2 rounded-xl text-xs font-bold border border-primary text-primary hover:bg-primary/10 transition-all">
            {t.viewProfile}
          </Link>
          <button className="flex-1 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all">
            {t.makeOffer}
          </button>
        </div>
      </div>
    </div>
  );
}
