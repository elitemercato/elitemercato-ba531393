import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/em-i18n";
import { PLAYERS, playerName, playerClub, formatDZD, type Player } from "@/lib/em-data";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Check } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Player Comparison — Elite Mercato" },
      { name: "description", content: "Compare Algerian football players side by side: stats, market value, physical attributes." },
      { property: "og:title", content: "Player Comparison — Elite Mercato" },
      { property: "og:description", content: "Compare players side by side on Elite Mercato." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { lang, t } = useLang();
  const isAr = lang === "ar";
  const [selected, setSelected] = useState<number[]>([1, 7]);

  const L = {
    title: isAr ? "مقارنة اللاعبين" : lang === "fr" ? "Comparaison des joueurs" : "Player Comparison",
    sub: isAr ? "اختر حتى 4 لاعبين لعرض إحصياتهم جنبًا إلى جنب" : lang === "fr" ? "Sélectionnez jusqu'à 4 joueurs" : "Pick up to 4 players to compare",
    pick: isAr ? "اختر اللاعبين" : lang === "fr" ? "Choisir les joueurs" : "Select players",
    empty: isAr ? "اختر لاعبًا واحدًا على الأقل" : lang === "fr" ? "Sélectionnez au moins un joueur" : "Select at least one player",
    attr: isAr ? "المعيار" : lang === "fr" ? "Critère" : "Attribute",
    max: isAr ? "الحد الأقصى 4 لاعبين" : "Max 4",
  };

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 4 ? prev : [...prev, id]);
  };

  const players = useMemo(() => selected.map(id => PLAYERS.find(p => p.id === id)!).filter(Boolean), [selected]);

  const rows: { label: string; get: (p: Player) => React.ReactNode; better?: "high" | "low" }[] = [
    { label: t.positions[/*key*/ "ST"] ? (isAr ? "المركز" : lang === "fr" ? "Poste" : "Position") : "Position", get: p => t.positions[p.position] ?? p.position },
    { label: isAr ? "النادي" : lang === "fr" ? "Club" : "Club", get: p => playerClub(p, lang) },
    { label: t.age, get: p => `${p.age} ${isAr ? "سنة" : lang === "fr" ? "ans" : "yrs"}`, better: "low" },
    { label: t.rating, get: p => p.rating, better: "high" },
    { label: t.marketValue, get: p => `${formatDZD(p.value)} ${t.dzd}`, better: "high" },
    { label: t.goals, get: p => p.goals, better: "high" },
    { label: t.assists, get: p => p.assists, better: "high" },
    { label: t.height, get: p => `${p.height} cm` },
    { label: t.weight, get: p => `${p.weight} kg` },
    { label: t.foot, get: p => p.foot === "R" ? (isAr ? "يمنى" : lang === "fr" ? "Droite" : "Right") : (isAr ? "يسرى" : lang === "fr" ? "Gauche" : "Left") },
    { label: t.nationality, get: p => p.nationality },
  ];

  const bestIndex = (row: typeof rows[number]): number | null => {
    if (!row.better || players.length < 2) return null;
    const nums = players.map(p => {
      const v = row.get(p);
      if (typeof v === "number") return v;
      return null;
    });
    if (nums.some(n => n === null)) {
      // try numeric from raw fields
      const raw = players.map(p => {
        if (row.label === t.marketValue) return p.value;
        if (row.label === t.age) return p.age;
        return null as number | null;
      });
      if (raw.some(r => r === null)) return null;
      const arr = raw as number[];
      return row.better === "high" ? arr.indexOf(Math.max(...arr)) : arr.indexOf(Math.min(...arr));
    }
    const arr = nums as number[];
    return row.better === "high" ? arr.indexOf(Math.max(...arr)) : arr.indexOf(Math.min(...arr));
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{L.title}</h1>
        <p className="text-muted-foreground mt-2">{L.sub}</p>
      </div>

      <Card className="p-4 mb-6 bg-card/50 border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">{L.pick}</h2>
          <span className="text-xs text-muted-foreground">{selected.length}/4</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PLAYERS.map(p => {
            const active = selected.includes(p.id);
            const disabled = !active && selected.length >= 4;
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                disabled={disabled}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                  active
                    ? "bg-primary/15 border-primary text-primary"
                    : disabled
                    ? "border-border text-muted-foreground/50 cursor-not-allowed"
                    : "border-border text-foreground hover:bg-white/5"
                }`}
              >
                {active ? <Check size={14} /> : null}
                <span>{playerName(p, lang)}</span>
                <span className="text-[10px] opacity-70">({p.position})</span>
              </button>
            );
          })}
        </div>
      </Card>

      {players.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">{L.empty}</Card>
      ) : (
        <Card className="overflow-hidden border-border bg-card/50">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px] font-bold text-foreground">{L.attr}</TableHead>
                  {players.map((p, i) => (
                    <TableHead key={p.id} className="min-w-[160px]">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-foreground">{playerName(p, lang)}</div>
                          <div className="text-xs text-muted-foreground">{playerClub(p, lang)}</div>
                        </div>
                        <button
                          onClick={() => toggle(p.id)}
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground"
                          aria-label="remove"
                        >
                          <X size={14} />
                        </button>
                        <span className="sr-only">{i}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, ri) => {
                  const best = bestIndex(row);
                  return (
                    <TableRow key={ri}>
                      <TableCell className="font-semibold text-muted-foreground">{row.label}</TableCell>
                      {players.map((p, i) => (
                        <TableCell
                          key={p.id}
                          className={`${best === i ? "text-gold font-bold" : "text-foreground"}`}
                        >
                          {row.get(p)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
