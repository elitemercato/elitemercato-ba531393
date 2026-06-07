import { useEffect, useState } from "react";
import { Lock, ShieldCheck, CreditCard, Loader2, CheckCircle2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { notifyAdmin, type AdminNotifyPayload } from "@/lib/notify-admin";

type Method = "edahabia" | "cib";

export type CheckoutItem = {
  title: string;
  subtitle?: string;
  price: number;
};

export function CheckoutModal({
  open,
  item,
  onClose,
  successMessage = "تم الدفع بنجاح! مرحباً بك في عالم Elite Mercato",
  successDescription,
  notifyEventType,
}: {
  open: boolean;
  item: CheckoutItem | null;
  onClose: () => void;
  successMessage?: string;
  successDescription?: string;
  notifyEventType?: AdminNotifyPayload["eventType"];
}) {
  const [method, setMethod] = useState<Method>("edahabia");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setMethod("edahabia");
      setName("");
      setCard("");
      setExp("");
      setCvv("");
      setLoading(false);
      setDone(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onClose]);

  if (!open || !item) return null;

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const valid =
    name.trim().length >= 3 &&
    card.replace(/\s/g, "").length === 16 &&
    /^\d{2}\/\d{2}$/.test(exp) &&
    cvv.length >= 3;

  const handlePay = () => {
    if (!valid || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      if (notifyEventType && item) {
        notifyAdmin({
          eventType: notifyEventType,
          userName: name,
          itemTitle: item.title,
          itemSubtitle: item.subtitle,
          itemPrice: item.price,
        });
      }
      setTimeout(() => {
        onClose();
        toast.success(successMessage, {
          description: successDescription ?? item.title,
          icon: <CheckCircle2 className="text-emerald-500" />,
          duration: 5000,
        });
      }, 900);
    }, 1500);
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-tajawal animate-fade-in"
      style={{ background: "rgba(5, 10, 25, 0.72)", backdropFilter: "blur(6px)" }}
      onClick={() => !loading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-gold/30 bg-card text-foreground shadow-2xl"
        style={{ boxShadow: "0 25px 80px -20px rgba(0,0,0,0.6)" }}
      >
        {/* Header */}
        <div
          className="relative p-5 sm:p-6 text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="إغلاق"
            className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-40"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[11px] font-bold border border-gold/40">
              <ShieldCheck size={12} /> دفع آمن · SSL 256-bit
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">ملخّص الطلب</h2>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="text-right flex-1 min-w-0">
              <div className="text-sm font-bold opacity-90 truncate">{item.title}</div>
              {item.subtitle && (
                <div className="text-[11px] opacity-70 truncate">{item.subtitle}</div>
              )}
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">المجموع</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gold">
                {item.price.toLocaleString("fr-DZ")} <span className="text-xs font-bold">دج</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success overlay */}
        {done && (
          <div className="absolute inset-0 z-10 bg-card flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="h-20 w-20 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle2 size={48} strokeWidth={2.2} />
            </div>
            <h3 className="text-xl font-extrabold text-primary mb-1">تم الدفع بنجاح</h3>
            <p className="text-sm text-muted-foreground">مرحباً بك في عالم Elite Mercato</p>
          </div>
        )}

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Method */}
          <div>
            <div className="text-xs font-bold text-muted-foreground mb-2">طريقة الدفع</div>
            <div className="grid grid-cols-2 gap-3">
              <MethodTile
                active={method === "edahabia"}
                onClick={() => setMethod("edahabia")}
                title="البطاقة الذهبية"
                hint="Edahabia · بريد الجزائر"
                accent="gold"
              />
              <MethodTile
                active={method === "cib"}
                onClick={() => setMethod("cib")}
                title="البطاقة البنكية CIB"
                hint="Carte Interbancaire"
                accent="primary"
              />
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3">
            <Field label="الاسم على البطاقة">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أحمد بلحاج"
                className="ltr-input"
                dir="rtl"
              />
            </Field>
            <Field label="رقم البطاقة">
              <div className="relative">
                <input
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  inputMode="numeric"
                  dir="ltr"
                  className="ltr-input pr-10"
                />
                <CreditCard className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground" size={16} />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="تاريخ الانتهاء">
                <input
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  dir="ltr"
                  className="ltr-input"
                />
              </Field>
              <Field label="CVV">
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                  dir="ltr"
                  className="ltr-input"
                />
              </Field>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handlePay}
            disabled={!valid || loading}
            className="w-full py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elite)" }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                جاري معالجة الدفع...
              </>
            ) : (
              <>
                <Lock size={16} />
                تأكيد الدفع الآمن
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck size={12} className="text-emerald-500" />
            معاملاتك مشفّرة ومحمية بموجب معايير PCI-DSS
            <Sparkles size={12} className="text-gold" />
          </div>
        </div>
      </div>

      <style>{`
        .ltr-input {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 0.75rem;
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          font-size: 0.9rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          font-family: inherit;
        }
        .ltr-input:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px color-mix(in oklab, hsl(var(--primary)) 18%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-right">
      <div className="text-xs font-bold text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}

function MethodTile({
  active,
  onClick,
  title,
  hint,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
  accent: "gold" | "primary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-right p-3 rounded-xl border-2 transition-all ${
        active
          ? accent === "gold"
            ? "border-gold bg-gold/10"
            : "border-primary bg-primary/10"
          : "border-border bg-card hover:border-gold/40"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className={`h-9 w-12 rounded-md flex items-center justify-center text-[10px] font-extrabold ${
            accent === "gold"
              ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-black"
              : "bg-gradient-to-br from-blue-600 to-indigo-800 text-white"
          }`}
        >
          {accent === "gold" ? "DZ" : "CIB"}
        </div>
        {active && (
          <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <CheckCircle2 size={14} />
          </span>
        )}
      </div>
      <div className="mt-2 font-extrabold text-sm text-foreground">{title}</div>
      <div className="text-[10px] text-muted-foreground">{hint}</div>
    </button>
  );
}
