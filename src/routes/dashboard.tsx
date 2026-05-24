import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Crown, Footprints, Play, Ruler, Weight, Building2, RefreshCw, TrendingUp, Target, Award, GitCompareArrows, Search, Filter, Briefcase } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/em/RequireAuth";
import { PLAYERS, formatDZD, type Player } from "@/lib/em-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "الحقيبة الرقمية — Elite Mercato" },
      { name: "description", content: "الحقيبة الرقمية الاحترافية للاعبين على منصة Elite Mercato." },
    ],
  }),
  component: () => <RequireAuth><Dashboard /></RequireAuth>,
});

function Dashboard() {
  const riyad = PLAYERS.find(p => p.id === 1)!;
  const ayoub = PLAYERS.find(p => p.id === 7)!;

  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">الحقيبة الرقمية</h1>
            <p className="text-sm text-muted-foreground mt-1">ملفات اللاعبين المحترفين على المنصة</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/compare" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30 hover:bg-primary/25 transition">
              <GitCompareArrows size={14} /> مقارنة بين اللاعبين
            </Link>
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
              <Crown size={14} /> Elite Mercato
            </span>
          </div>
        </header>

        <PlayerProfile player={riyad} />
        <PlayerProfile player={ayoub} />

        <ScoutingEngine />

        <div className="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gold text-gold-foreground flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <p className="text-sm text-foreground/90">
            <span className="font-bold">للأندية:</span> اشتراك النادي السنوي بسعر
            <span className="font-extrabold text-gold"> 149,000 دج </span>
            — وصول كامل لقاعدة اللاعبين والخدمات.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScoutingEngine() {
  const positionAr: Record<string, string> = { ALL: "كل المراكز", ST: "مهاجم", CM: "وسط ميدان", CB: "مدافع محوري", GK: "حارس مرمى", RW: "جناح أيمن", LB: "ظهير أيسر", RB: "ظهير أيمن" };
  const [pos, setPos] = useState<string>("ALL");
  const [maxAge, setMaxAge] = useState<number>(30);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => PLAYERS.filter(p =>
    (pos === "ALL" || p.position === pos) &&
    p.age <= maxAge &&
    (q.trim() === "" || p.name.includes(q) || p.club.includes(q))
  ), [pos, maxAge, q]);

  return (
    <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-wrap gap-2" style={{ background: "var(--gradient-primary)" }}>
        <div className="flex items-center gap-2 text-primary-foreground">
          <Briefcase size={18} />
          <h2 className="font-extrabold text-base sm:text-lg">محرّك الكشافة الرقمي · B2B</h2>
        </div>
        <span className="text-[11px] font-bold text-gold bg-gold/15 border border-gold/40 px-2.5 py-1 rounded-full">{filtered.length} لاعب متاح</span>
      </div>

      <div className="p-4 grid sm:grid-cols-3 gap-3 border-b border-border bg-secondary/40">
        <label className="flex items-center gap-2 bg-background rounded-xl border border-border px-3 py-2">
          <Search size={16} className="text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="ابحث باسم اللاعب أو النادي…" className="flex-1 bg-transparent text-sm outline-none text-right" />
        </label>
        <label className="flex items-center gap-2 bg-background rounded-xl border border-border px-3 py-2">
          <Filter size={16} className="text-muted-foreground" />
          <select value={pos} onChange={e => setPos(e.target.value)} className="flex-1 bg-transparent text-sm outline-none text-right">
            {Object.entries(positionAr).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 bg-background rounded-xl border border-border px-3 py-2 text-sm">
          <span className="text-muted-foreground shrink-0">السن ≤</span>
          <input type="range" min={18} max={35} value={maxAge} onChange={e => setMaxAge(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="font-extrabold text-primary w-8 text-center">{maxAge}</span>
        </label>
      </div>

      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">لا يوجد لاعب يطابق هذه المعايير.</div>
        )}
        {filtered.map(p => <ScoutCard key={p.id} p={p} posAr={positionAr[p.position]} />)}
      </div>
    </section>
  );
}

function ScoutCard({ p, posAr }: { p: Player; posAr: string }) {
  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-elite)] transition-all group">
      <div className="flex items-center gap-3 p-3">
        <div className="h-14 w-14 rounded-xl overflow-hidden bg-secondary ring-2 ring-gold/30 shrink-0 flex items-center justify-center font-extrabold text-primary">
          {p.photo ? <img src={p.photo} alt={p.name} className="h-full w-full object-cover" /> : p.img}
        </div>
        <div className="flex-1 min-w-0 text-right">
          <div className="flex items-center justify-end gap-1.5">
            <h4 className="font-extrabold text-sm truncate">{p.name}</h4>
            <BadgeCheck size={14} className="text-gold shrink-0" />
          </div>
          <p className="text-[11px] text-muted-foreground truncate">{posAr} · {p.club}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-bold">{p.age} سنة</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold/15 text-gold font-bold">{p.rating}/100</span>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 grid grid-cols-2 gap-2">
        <Link to="/player/$id" params={{ id: String(p.id) }}
          className="text-center text-[11px] font-extrabold py-2 rounded-lg text-primary-foreground hover:brightness-110 active:scale-95 transition"
          style={{ background: "var(--gradient-primary)" }}>
          عرض الحقيبة الرقمية
        </Link>
        <button
          onClick={() => toast.success("تم إرسال عرض رسمي!", { description: `إلى ${p.name} (${p.club}) — قيمة مقترحة: ${formatDZD(p.value)} €` })}
          className="text-center text-[11px] font-extrabold py-2 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition"
        >
          إرسال عرض
        </button>
      </div>
    </div>
  );
}

function PlayerProfile({ player }: { player: Player }) {
  const positionAr: Record<string, string> = { ST: "مهاجم", CM: "وسط ميدان", CB: "مدافع محوري", GK: "حارس مرمى", RW: "جناح أيمن", LB: "ظهير أيسر" };
  return (
    <article className="grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="h-28" style={{ background: "var(--gradient-primary)" }} />
        <div className="px-6 pb-6 -mt-16">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="h-28 w-28 rounded-2xl border-4 border-card shadow-lg overflow-hidden bg-secondary shrink-0 ring-2 ring-gold/40">
              {player.photo ? (
                <img src={player.photo} alt={player.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center font-extrabold text-2xl text-primary">{player.img}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold truncate">{player.name}</h2>
                <BadgeCheck className="text-gold shrink-0" size={18} />
                <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-[11px] font-bold">{player.position}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{positionAr[player.position]} · {player.club}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30">
                  <Crown size={12} /> اشتراك مفعّل
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
                  <Award size={12} /> تقييم {player.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <Stat icon={Ruler} label="الطول" value={`${(player.height / 100).toFixed(2)} م`} />
            <Stat icon={Weight} label="الوزن" value={`${player.weight} كغ`} />
            <Stat icon={Footprints} label="القدم المفضّلة" value={player.foot === "R" ? "اليمنى" : "اليسرى"} />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-3">
            <Stat icon={Target} label="الأهداف" value={String(player.goals)} />
            <Stat icon={TrendingUp} label="التمريرات" value={String(player.assists)} />
            <Stat icon={Award} label="السن" value={`${player.age} سنة`} />
            <Stat icon={Crown} label="القيمة" value={`${formatDZD(player.value)} €`} />
          </div>

          <div className="mt-5 rounded-xl bg-secondary/60 border border-border p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>مؤشر الأداء العام</span>
              <span className="font-extrabold text-gold">{player.rating}/100</span>
            </div>
            <div className="h-2 rounded-full bg-background overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${player.rating}%`, background: "var(--gradient-gold)" }} />
            </div>
          </div>
        </div>
      </section>

      <aside className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h3 className="font-extrabold text-sm">أبرز اللقطات</h3>
          <span className="text-[10px] text-muted-foreground">Highlight Reels</span>
        </div>
        <div className="relative aspect-video flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
          <button
            onClick={() => toast.info("جاري تحميل أبرز اللقطات…", { description: `${player.name} · 02:34 HD` })}
            className="h-14 w-14 rounded-full bg-gold hover:brightness-110 text-gold-foreground flex items-center justify-center shadow-xl transition hover:scale-105">
            <Play size={24} className="ms-0.5" fill="currentColor" />
          </button>
          <span className="absolute bottom-2 right-3 text-primary-foreground/80 text-[10px]">02:34 · HD</span>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-[11px] font-bold text-muted-foreground">باقة الرياضيين</span>
          <div className="mt-1 text-2xl font-extrabold text-primary">9,900 <span className="text-sm text-muted-foreground">دج / سنوياً</span></div>
          <button
            onClick={() => toast.success("تم تجديد الاشتراك بنجاح!", { description: "باقة الرياضيين · 9,900 دج / سنوياً" })}
            className="mt-auto pt-3 inline-flex items-center justify-center gap-2 font-bold rounded-xl py-2.5 text-gold-foreground text-sm" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}>
            <RefreshCw size={14} /> تجديد الاشتراك
          </button>
        </div>
      </aside>
    </article>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary border border-border p-3 text-center">
      <Icon size={18} className="mx-auto text-primary" />
      <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
      <div className="font-extrabold text-sm mt-0.5">{value}</div>
    </div>
  );
}
