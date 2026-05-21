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
    <div dir="rtl" className="font-tajawal min-h-screen bg-[#F3F4F6] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]">الحقيبة الرقمية</h1>
            <p className="text-sm text-slate-500 mt-1">ملفك الاحترافي الموحّد — لاعبين ومدربين</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold">
            <Crown size={14} /> Elite Mercato
          </span>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-28 bg-gradient-to-l from-[#1E3A8A] via-[#1E3A8A] to-[#00BCD4]" />
            <div className="px-6 pb-6 -mt-12">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <img
                  src="https://api.dicebear.com/9.x/initials/svg?seed=AK&backgroundColor=1E3A8A"
                  alt="صورة اللاعب"
                  className="h-24 w-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold">أيوب خلوامة</h2>
                    <BadgeCheck className="text-[#00BCD4]" size={18} />
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">لاعب وسط هجومي · اتحاد البليدة</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4ADE80]/15 text-[#15803D] text-xs font-bold">
                    <Crown size={14} /> اشتراك احترافي مفعّل
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <Stat icon={Ruler} label="الطول" value="1.82 م" />
                <Stat icon={Weight} label="الوزن" value="76 كغ" />
                <Stat icon={Footprints} label="القدم المفضّلة" value="اليمنى" />
              </div>
            </div>
          </section>

          {/* Subscription CTA */}
          <aside className="bg-gradient-to-br from-[#1E3A8A] to-[#0F2766] text-white rounded-2xl p-6 shadow-md flex flex-col">
            <span className="text-xs font-bold opacity-80">باقة الرياضيين</span>
            <div className="mt-2 text-3xl font-extrabold">9,900 <span className="text-base font-bold opacity-90">دج</span></div>
            <div className="text-xs opacity-80">/ سنوياً</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#4ADE80]" /> ملف رقمي احترافي</li>
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#4ADE80]" /> ظهور أمام الأندية</li>
              <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#4ADE80]" /> وصول كامل للمتجر</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center gap-2 bg-[#4ADE80] hover:bg-[#22c55e] text-[#0F172A] font-extrabold rounded-xl py-3 transition">
              <RefreshCw size={16} /> تجديد الاشتراك
            </button>
          </aside>
        </div>

        {/* Highlight reel */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <h3 className="font-extrabold text-lg">أبرز اللقطات</h3>
            <span className="text-xs text-slate-500">Highlight Reels</span>
          </div>
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-[#1E3A8A] flex items-center justify-center">
            <button className="h-16 w-16 rounded-full bg-white/95 hover:bg-white text-[#1E3A8A] flex items-center justify-center shadow-xl transition hover:scale-105">
              <Play size={28} className="ms-1" fill="currentColor" />
            </button>
            <span className="absolute bottom-3 right-4 text-white/80 text-xs">02:34 · HD</span>
          </div>
        </section>

        {/* B2B banner */}
        <div className="rounded-2xl border border-[#00BCD4]/30 bg-[#00BCD4]/10 px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#00BCD4] text-white flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <p className="text-sm text-slate-700">
            <span className="font-bold">للأندية:</span> اشتراك النادي السنوي بسعر
            <span className="font-extrabold text-[#1E3A8A]"> 149,000 دج </span>
            — وصول كامل لقاعدة اللاعبين والخدمات.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
      <Icon size={18} className="mx-auto text-[#1E3A8A]" />
      <div className="mt-1 text-[11px] text-slate-500">{label}</div>
      <div className="font-extrabold text-sm mt-0.5">{value}</div>
    </div>
  );
}
