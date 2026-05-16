import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { PLAYERS, playerName, playerWilaya } from "@/lib/em-data";
import { useLang } from "@/lib/em-i18n";
import { PlayerCard } from "@/components/em/PlayerCard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Club Dashboard — Elite Mercato" },
      { name: "description", content: "Browse Algerian football talents with advanced filters: position, wilaya, market value." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, lang } = useLang();
  const [pos, setPos] = useState("");
  const [wil, setWil] = useState("");
  const [val, setVal] = useState("");
  const [q, setQ] = useState("");

  const filtered = PLAYERS.filter(p => {
    const name = playerName(p, lang).toLowerCase();
    if (q && !name.includes(q.toLowerCase())) return false;
    if (pos && p.position !== pos) return false;
    if (wil && playerWilaya(p, lang) !== wil) return false;
    if (val === "low" && p.value >= 5_000_000) return false;
    if (val === "mid" && (p.value < 5_000_000 || p.value > 15_000_000)) return false;
    if (val === "high" && p.value <= 15_000_000) return false;
    return true;
  });

  const wilayas = [...new Set(PLAYERS.map(p => playerWilaya(p, lang)))];
  const positions = [...new Set(PLAYERS.map(p => p.position))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">{t.navDashboard}</h1>
        <p className="text-sm text-muted-foreground mt-1">Ligue 1 Algérie · LIRF · {new Date().getFullYear()}</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="lg:sticky lg:top-20 lg:self-start rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center gap-2 font-bold">
            <Filter size={16} className="text-primary" /> {t.filterTitle}
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder={lang === "ar" ? "بحث..." : lang === "fr" ? "Recherche..." : "Search..."}
              className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>

          <Field label={t.filterPos}>
            <select value={pos} onChange={e => setPos(e.target.value)} className={selectCls}>
              <option value="">{t.allPos}</option>
              {positions.map(p => <option key={p} value={p}>{t.positions[p] || p}</option>)}
            </select>
          </Field>

          <Field label={t.filterWilaya}>
            <select value={wil} onChange={e => setWil(e.target.value)} className={selectCls}>
              <option value="">{t.allWilaya}</option>
              {wilayas.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>

          <Field label={t.filterValue}>
            <select value={val} onChange={e => setVal(e.target.value)} className={selectCls}>
              <option value="">{t.allVal}</option>
              <option value="low">{t.val100}</option>
              <option value="mid">{t.val500}</option>
              <option value="high">{t.val1000}</option>
            </select>
          </Field>
        </aside>

        <div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(p => <PlayerCard key={p.id} p={p} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl">
              {t.noResults}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const selectCls = "w-full bg-background border border-border rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}
