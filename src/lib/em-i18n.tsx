import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./em-data";

export const T = {
  ar: {
    brand: "النخبة ميركاتو", tagline: "منظومة رياضية وتكنولوجية متكاملة",
    subtagline: "نربط المواهب الجزائرية بالأندية الاحترافية عبر الكشف القائم على البيانات والخدمات المتكاملة",
    navHome: "الرئيسية", navDashboard: "لوحة الأندية", navPlayer: "ملف اللاعب",
    navMarket: "السوق", navPricing: "الأسعار", login: "تسجيل الدخول",
    stat1: "لاعب نشط", stat2: "نادٍ احترافي", stat3: "معاملة مكتملة", stat4: "خبير تقني",
    heroBtn: "استكشف المنصة", heroBtn2: "للأندية: ابدأ مجاناً",
    filterTitle: "فلترة اللاعبين", filterPos: "المركز", filterWilaya: "الولاية", filterValue: "القيمة السوقية",
    allPos: "كل المراكز", allWilaya: "كل الولايات", allVal: "كل القيم",
    viewProfile: "عرض الملف الكامل", makeOffer: "تقديم عرض رسمي",
    marketValue: "القيمة السوقية", age: "العمر", rating: "التقييم",
    playerPortfolio: "ملف اللاعب", physicalStats: "الإحصائيات البدنية",
    tacticalRole: "الدور التكتيكي", highlights: "المقاطع المرئية",
    upgradeTitle: "ارتقِ إلى النخبة برو", upgradeDesc: "احصل على رؤية أعلى واتصالات مباشرة مع الأندية الكبرى",
    upgradeBtn: "ترقية إلى برو — 1,500 د.ج/شهر",
    marketTitle: "سوق الخدمات الرياضية", marketSub: "خبراء موثوقون لرفع مستواك التنافسي",
    bookNow: "احجز الآن", dzd: "د.ج", reviews: "تقييم",
    pricingTitle: "خطط الاشتراك للأندية", pricingSubtext: "ابدأ رحلتك الرقمية في كشف المواهب اليوم",
    perMonth: "/شهر", subscribe: "اشترك الآن", mostPop: "الأكثر شعبية",
    height: "الطول", weight: "الوزن", foot: "القدم المهيمنة", goals: "أهداف", assists: "تمريرات حاسمة",
    nationality: "الجنسية", contactHidden: "رقم الاتصال محمي",
    positions: { ST: "مهاجم", CM: "وسط", CB: "مدافع", GK: "حارس", RW: "جناح أيمن", LB: "ظهير أيسر" } as Record<string, string>,
    val100: "أقل من 5 مليون", val500: "5–15 مليون", val1000: "أكثر من 15 مليون",
    backDash: "العودة إلى لوحة الأندية", noResults: "لا توجد نتائج",
    season: "الموسم", yrs: "سنة",
    feat1Title: "كشف قائم على البيانات", feat1Desc: "فلاتر متقدمة، إحصائيات دقيقة، ومقارنة اللاعبين في الوقت الفعلي",
    feat2Title: "منصة آمنة ومحمية", feat2Desc: "بيانات الاتصال محمية لضمان العمولات ونزاهة الصفقات",
    feat3Title: "تغطية وطنية شاملة", feat3Desc: "لاعبون من كل ولايات الجزائر، الليغ 1 والبطولة الجهوية",
    heroBadge: "الجيل القادم من كشف المواهب الجزائرية",
    navJoin: "انضم إلينا", joinTitle: "انضم إلى النخبة ميركاتو", joinSub: "اختر نوع حسابك للبدء",
    roleLaeb: "لاعب", roleLaebDesc: "اعرض موهبتك للأندية والمستكشفين",
    roleNadi: "نادٍ", roleNadiDesc: "اكتشف وجنّد أفضل المواهب",
    roleModarib: "مدرب", roleModaribDesc: "قدّم خبرتك التدريبية",
    roleTaqani: "تقني", roleTaqaniDesc: "خدمات طبية، قانونية، إعلامية",
    selectRole: "اختر دورك", fullName: "الاسم الكامل", email: "البريد الإلكتروني",
    phone: "رقم الهاتف", password: "كلمة المرور", confirmPwd: "تأكيد كلمة المرور",
    wilaya: "الولاية", createAccount: "إنشاء الحساب", haveAccount: "لديك حساب؟",
    signinTitle: "تسجيل الدخول", signinSub: "مرحبا بعودتك إلى منصتك",
    noAccount: "ليس لديك حساب؟", forgotPwd: "نسيت كلمة المرور؟", signin: "دخول",
    backHome: "العودة للرئيسية",
    heroTitle1: "كن محترفا.", heroTitle2: "وإستثمر في مجالك الرياضي.",
    heroDesc: "اكتشف فرصك، طوّر أداءك واحمِ حقوقك. أول منصة رياضية جزائرية تدمج ذكاء البيانات بالخبرة الميدانية لبناء مسار إحترافي.",
    featuresTitle: "لماذا النخبة ميركاتو؟", featuresSubtitle: "منظومة متكاملة تجمع الكشف الذكي بالحماية القانونية والخدمات الميدانية في منصة واحدة.",
    servicesTitle: "خدمات احترافية تحت الطلب", servicesSubtitle: "تواصل مباشرة مع خبراء معتمدين في المجال القانوني، التدريبي، الطبي والإعلامي.",
  },
  en: {
    brand: "Elite Mercato", tagline: "Algeria's Premier Sport-Tech Platform",
    subtagline: "Bridging Algerian talents with professional clubs through data-driven scouting and integrated services",
    navHome: "Home", navDashboard: "Club Dashboard", navPlayer: "Player Profile",
    navMarket: "Marketplace", navPricing: "Pricing", login: "Login",
    stat1: "Active Players", stat2: "Pro Clubs", stat3: "Deals Closed", stat4: "Tech Experts",
    heroBtn: "Explore Platform", heroBtn2: "Clubs: Start Free",
    filterTitle: "Filter Players", filterPos: "Position", filterWilaya: "Wilaya", filterValue: "Market Value",
    allPos: "All Positions", allWilaya: "All Wilayas", allVal: "All Values",
    viewProfile: "View Full Profile", makeOffer: "Make Official Offer",
    marketValue: "Market Value", age: "Age", rating: "Rating",
    playerPortfolio: "Player Portfolio", physicalStats: "Physical Stats",
    tacticalRole: "Tactical Role", highlights: "Video Highlights",
    upgradeTitle: "Upgrade to Elite Pro", upgradeDesc: "Get higher visibility & direct connections with major clubs",
    upgradeBtn: "Upgrade to Pro — 1,500 DZD/mo",
    marketTitle: "Sports Services Marketplace", marketSub: "Trusted experts to elevate your competitive edge",
    bookNow: "Book Now", dzd: "DZD", reviews: "reviews",
    pricingTitle: "Club Subscription Plans", pricingSubtext: "Start your digital talent scouting journey today",
    perMonth: "/mo", subscribe: "Subscribe Now", mostPop: "Most Popular",
    height: "Height", weight: "Weight", foot: "Preferred Foot", goals: "Goals", assists: "Assists",
    nationality: "Nationality", contactHidden: "Contact protected",
    positions: { ST: "Striker", CM: "Midfielder", CB: "Defender", GK: "Goalkeeper", RW: "Right Winger", LB: "Left Back" } as Record<string, string>,
    val100: "Under 5M", val500: "5M–15M", val1000: "Over 15M",
    backDash: "Back to dashboard", noResults: "No results found",
    season: "Season", yrs: "yrs",
    feat1Title: "Data-Driven Scouting", feat1Desc: "Advanced filters, precise stats & real-time player comparison",
    feat2Title: "Protected Platform", feat2Desc: "Contact data protected, commissions guaranteed",
    feat3Title: "Full National Coverage", feat3Desc: "Players from all Algerian wilayas, Ligue 1 & LIRF",
    heroBadge: "Next-gen Algerian talent scouting",
    navJoin: "Join Us", joinTitle: "Join Elite Mercato", joinSub: "Choose your account type to get started",
    roleLaeb: "Player", roleLaebDesc: "Showcase your talent to clubs and scouts",
    roleNadi: "Club", roleNadiDesc: "Discover and recruit top talent",
    roleModarib: "Coach", roleModaribDesc: "Offer your coaching expertise",
    roleTaqani: "Technician", roleTaqaniDesc: "Medical, legal, media services",
    selectRole: "Select your role", fullName: "Full Name", email: "Email",
    phone: "Phone", password: "Password", confirmPwd: "Confirm Password",
    wilaya: "Wilaya", createAccount: "Create Account", haveAccount: "Already have an account?",
    signinTitle: "Sign In", signinSub: "Welcome back to your platform",
    noAccount: "Don't have an account?", forgotPwd: "Forgot password?", signin: "Sign In",
    backHome: "Back to home",
    heroTitle1: "Become a PRO.", heroTitle2: "Invest in your sports career.",
    heroDesc: "Discover opportunities, develop your performance, and protect your rights. Algeria's first sports platform combining data intelligence with field expertise to build a professional path.",
    featuresTitle: "Why Elite Mercato?", featuresSubtitle: "An integrated ecosystem combining smart scouting, legal protection, and field services in a single platform.",
    servicesTitle: "Professional Services On Demand", servicesSubtitle: "Connect directly with certified experts in legal, coaching, medical and media fields.",
  },
  fr: {
    brand: "Elite Mercato", tagline: "La Plateforme Sport-Tech N°1 d'Algérie",
    subtagline: "Connecter les talents algériens aux clubs professionnels via le recrutement basé sur les données",
    navHome: "Accueil", navDashboard: "Tableau Clubs", navPlayer: "Profil Joueur",
    navMarket: "Marché", navPricing: "Tarifs", login: "Connexion",
    stat1: "Joueurs Actifs", stat2: "Clubs Pro", stat3: "Deals Conclus", stat4: "Experts Techniques",
    heroBtn: "Explorer la Plateforme", heroBtn2: "Clubs : Commencer Gratuitement",
    filterTitle: "Filtrer les Joueurs", filterPos: "Poste", filterWilaya: "Wilaya", filterValue: "Valeur Marchande",
    allPos: "Tous les Postes", allWilaya: "Toutes Wilayas", allVal: "Toutes Valeurs",
    viewProfile: "Voir Profil Complet", makeOffer: "Faire une Offre Officielle",
    marketValue: "Valeur Marchande", age: "Âge", rating: "Note",
    playerPortfolio: "Portfolio Joueur", physicalStats: "Stats Physiques",
    tacticalRole: "Rôle Tactique", highlights: "Vidéos",
    upgradeTitle: "Passer à Elite Pro", upgradeDesc: "Visibilité accrue & connexions directes avec les grands clubs",
    upgradeBtn: "Passer à Pro — 1 500 DZD/mois",
    marketTitle: "Marché des Services Sportifs", marketSub: "Experts de confiance pour élever votre niveau compétitif",
    bookNow: "Réserver", dzd: "DZD", reviews: "avis",
    pricingTitle: "Plans d'Abonnement Clubs", pricingSubtext: "Lancez votre recrutement digital de talents aujourd'hui",
    perMonth: "/mois", subscribe: "S'abonner", mostPop: "Le Plus Populaire",
    height: "Taille", weight: "Poids", foot: "Pied Préféré", goals: "Buts", assists: "Passes D.",
    nationality: "Nationalité", contactHidden: "Contact protégé",
    positions: { ST: "Attaquant", CM: "Milieu", CB: "Défenseur", GK: "Gardien", RW: "Ailier Droit", LB: "Arrière G." } as Record<string, string>,
    val100: "Moins de 5M", val500: "5M–15M", val1000: "Plus de 15M",
    backDash: "Retour au tableau", noResults: "Aucun résultat",
    season: "Saison", yrs: "ans",
    feat1Title: "Recrutement basé sur les données", feat1Desc: "Filtres avancés, stats précises et comparaison en temps réel",
    feat2Title: "Plateforme sécurisée", feat2Desc: "Données protégées, commissions garanties",
    feat3Title: "Couverture nationale complète", feat3Desc: "Joueurs de toutes les wilayas, Ligue 1 & LIRF",
    heroBadge: "La nouvelle génération du recrutement algérien",
    navJoin: "Rejoignez-nous", joinTitle: "Rejoignez Elite Mercato", joinSub: "Choisissez votre type de compte pour commencer",
    roleLaeb: "Joueur", roleLaebDesc: "Présentez votre talent aux clubs et recruteurs",
    roleNadi: "Club", roleNadiDesc: "Découvrez et recrutez les meilleurs talents",
    roleModarib: "Entraîneur", roleModaribDesc: "Proposez votre expertise",
    roleTaqani: "Technicien", roleTaqaniDesc: "Services médicaux, juridiques, médiatiques",
    selectRole: "Choisissez votre rôle", fullName: "Nom complet", email: "Email",
    phone: "Téléphone", password: "Mot de passe", confirmPwd: "Confirmer le mot de passe",
    wilaya: "Wilaya", createAccount: "Créer le compte", haveAccount: "Déjà un compte ?",
    signinTitle: "Connexion", signinSub: "Bon retour sur votre plateforme",
    noAccount: "Pas encore de compte ?", forgotPwd: "Mot de passe oublié ?", signin: "Se connecter",
    backHome: "Retour à l'accueil",
    heroTitle1: "Devenez un PRO.", heroTitle2: "Investissez dans votre carrière sportive.",
    heroDesc: "Découvrez vos opportunités, développez vos performances et protégez vos droits. La première plateforme sportive algérienne alliant intelligence des données et expertise du terrain pour bâtir un parcours professionnel.",
    featuresTitle: "Pourquoi Elite Mercato ?", featuresSubtitle: "Un écosystème intégré qui combine recrutement intelligent, protection juridique et services de terrain dans une seule plateforme.",
    servicesTitle: "Services professionnels à la demande", servicesSubtitle: "Connectez-vous directement avec des experts certifiés dans les domaines juridique, sportif, médical et médiatique.",
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: typeof T["en"]; isRTL: boolean };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("em-lang")) as Lang | null;
    if (stored && ["ar", "en", "fr"].includes(stored)) setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("em-lang", l);
  };

  const isRTL = lang === "ar";
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang, isRTL]);

  return <LangCtx.Provider value={{ lang, setLang, t: T[lang] as typeof T["en"], isRTL }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be used inside LangProvider");
  return c;
}
