import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Crown, Footprints, Play, Ruler, Weight, Building2, RefreshCw } from "lucide-react";
import { RequireAuth } from "@/components/em/RequireAuth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "الحقيبة الرقمية — Elite Mercato" },
      { name: "description", content: "الحقيبة الرقمية الاحترافية للاعبين والمدربين على منصة Elite Mercato." },
    ],
  }),
  component: () => <RequireAuth><Dashboard /></RequireAuth>,
});

function Dashboard() {
  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">الحقيبة الرقمية</h1>
            <p className="text-sm text-muted-foreground mt-1">ملفك الاحترافي الموحّد — لاعبين ومدربين</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
            <Crown size={14} /> Elite Mercato
          </span>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="h-28" style={{ background: "var(--gradient-primary)" }} />
            <div className="px-6 pb-6 -mt-12">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <img
                  src="https://api.dicebear.com/9.x/initials/svg?seed=AK&backgroundColor=00843D"
                  alt="صورة اللاعب"
                  className="h-24 w-24 rounded-2xl border-4 border-card shadow-md object-cover bg-card"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold">أيوب قلومة</h2>
                    <BadgeCheck className="text-gold" size={18} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">ضهير أيمن · اتحاد البليدة</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30">
                    <Crown size={14} /> اشتراك احترافي مفعّل
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <Stat icon={Ruler} label="الطول" value="1.80 م" />
                <Stat icon={Weight} label="الوزن" value="74 كغ" />
                <Stat icon={Footprints} label="القدم المفضّلة" value="اليمنى" />
              </div>
            </div>
          </section>

          <aside
            className="rounded-2xl p-6 shadow-md flex flex-col text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elite)" }}
          >
            <span className="text-xs font-bold opacity-90">باقة الرياضيين</span>
            <div className="mt-2 text-3xl font-extrabold">9,900 <span className="text-base font-bold opacity-90">دج</span></div>
            <div className="text-xs opacity-80">/ سنوياً</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-gold" /> ملف رقمي احترافي</li>
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-gold" /> ظهور أمام الأندية</li>
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-gold" /> وصول كامل للمتجر</li>
            </ul>
            <button
              className="mt-5 inline-flex items-center justify-center gap-2 font-extrabold rounded-xl py-3 transition text-gold-foreground"
              style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
            >
              <RefreshCw size={16} /> تجديد الاشتراك
            </button>
          </aside>
        </div>

        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <h3 className="font-extrabold text-lg">أبرز اللقطات</h3>
            <span className="text-xs text-muted-foreground">Highlight Reels</span>
          </div>
          <div className="relative aspect-video flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <button className="h-16 w-16 rounded-full bg-gold hover:brightness-110 text-gold-foreground flex items-center justify-center shadow-xl transition hover:scale-105">
              <Play size={28} className="ms-1" fill="currentColor" />
            </button>
            <span className="absolute bottom-3 right-4 text-primary-foreground/80 text-xs">02:34 · HD</span>
          </div>
        </section>

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

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary border border-border p-3 text-center">
      <Icon size={18} className="mx-auto text-primary" />
      <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
      <div className="font-extrabold text-sm mt-0.5">{value}</div>
    </div>
  );
}
