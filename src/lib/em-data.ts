export type Player = {
  id: number;
  name: string; nameEn: string; nameFr: string;
  position: "ST" | "CM" | "CB" | "GK" | "RW" | "LB";
  club: string; clubEn: string; clubFr: string;
  wilaya: string; wilayaEn: string; wilayaFr: string;
  value: number; age: number; rating: number;
  goals: number; assists: number; img: string;
  photo?: string;
  foot: "R" | "L"; height: number; weight: number; nationality: string;
};

import riyadPhoto from "@/assets/players/riyad-b.png";

export const PLAYERS: Player[] = [
  { id: 1, name: "رياض ب.", nameEn: "Riyad B.", nameFr: "Riyad B.", position: "ST", club: "اتحاد العاصمة", clubEn: "USM Alger", clubFr: "USM Alger", wilaya: "الجزائر", wilayaEn: "Algiers", wilayaFr: "Alger", value: 15000000, age: 24, rating: 88, goals: 18, assists: 7, img: "RA", photo: riyadPhoto, foot: "R", height: 181, weight: 77, nationality: "DZ" },
  { id: 7, name: "أيوب ڨلومة", nameEn: "Ayoub Guellouma", nameFr: "Ayoub Guellouma", position: "ST", club: "اتحاد العاصمة", clubEn: "USM Alger", clubFr: "USM Alger", wilaya: "الجزائر", wilayaEn: "Algiers", wilayaFr: "Alger", value: 14000000, age: 23, rating: 87, goals: 16, assists: 6, img: "AG", foot: "R", height: 180, weight: 75, nationality: "DZ" },
  { id: 2, name: "أمين ط.", nameEn: "Amine T.", nameFr: "Amine T.", position: "CM", club: "شبيبة القبائل", clubEn: "JS Kabylie", clubFr: "JS Kabylie", wilaya: "تيزي وزو", wilayaEn: "Tizi Ouzou", wilayaFr: "Tizi Ouzou", value: 9500000, age: 22, rating: 82, goals: 5, assists: 12, img: "AT", foot: "L", height: 178, weight: 72, nationality: "DZ" },
  { id: 3, name: "يوسف م.", nameEn: "Youcef M.", nameFr: "Youcef M.", position: "CB", club: "مولودية الجزائر", clubEn: "MC Alger", clubFr: "MC Alger", wilaya: "الجزائر", wilayaEn: "Algiers", wilayaFr: "Alger", value: 7000000, age: 26, rating: 80, goals: 1, assists: 2, img: "YM", foot: "R", height: 188, weight: 83, nationality: "DZ" },
  { id: 4, name: "إسلام ح.", nameEn: "Islam H.", nameFr: "Islam H.", position: "GK", club: "مولودية وهران", clubEn: "MC Oran", clubFr: "MC Oran", wilaya: "وهران", wilayaEn: "Oran", wilayaFr: "Oran", value: 5000000, age: 28, rating: 83, goals: 0, assists: 0, img: "IH", foot: "R", height: 190, weight: 85, nationality: "DZ" },
  { id: 5, name: "طارق ب.", nameEn: "Tarek B.", nameFr: "Tarek B.", position: "RW", club: "نصر حسين داي", clubEn: "NA Hussein Dey", clubFr: "NA Hussein Dey", wilaya: "الجزائر", wilayaEn: "Algiers", wilayaFr: "Alger", value: 11000000, age: 21, rating: 85, goals: 11, assists: 9, img: "TB", foot: "L", height: 175, weight: 68, nationality: "DZ" },
  { id: 6, name: "سمير ع.", nameEn: "Samir A.", nameFr: "Samir A.", position: "LB", club: "الحراش", clubEn: "USM El Harrach", clubFr: "USM El Harrach", wilaya: "البليدة", wilayaEn: "Blida", wilayaFr: "Blida", value: 4200000, age: 23, rating: 76, goals: 2, assists: 5, img: "SA", foot: "L", height: 176, weight: 71, nationality: "DZ" },
];

export type Service = {
  id: number; category: "legal" | "coaching" | "medical" | "media";
  iconKey: "legal" | "tactical" | "medical" | "media" | "report" | "transfer";
  title: string; titleEn: string; titleFr: string;
  provider: string; providerEn: string; providerFr: string;
  price: number; rating: number; reviews: number;
  badge: string; badgeEn: string; badgeFr: string;
  color: string;
};

export const SERVICES: Service[] = [
  { id: 1, category: "legal", iconKey: "legal", title: "مراجعة العقود القانونية", titleEn: "Elite Legal: Contract Review", titleFr: "Elite Légal: Révision de Contrat", provider: "مكتب النخبة القانوني", providerEn: "Elite Law Office", providerFr: "Cabinet Juridique Elite", price: 15000, rating: 4.9, reviews: 47, badge: "موصى به", badgeEn: "Recommended", badgeFr: "Recommandé", color: "from-amber-500 to-yellow-600" },
  { id: 2, category: "coaching", iconKey: "tactical", title: "تحليل تكتيكي متقدم", titleEn: "Tactical Analysis – Coach Amin", titleFr: "Analyse Tactique – Coach Amin", provider: "المدرب أمين بن علي", providerEn: "Coach Amin Ben Ali", providerFr: "Coach Amin Ben Ali", price: 5000, rating: 4.8, reviews: 112, badge: "الأكثر طلباً", badgeEn: "Best Seller", badgeFr: "Plus Demandé", color: "from-emerald-500 to-green-600" },
  { id: 3, category: "medical", iconKey: "medical", title: "التقييم البدني الكامل", titleEn: "Elite Clinic: Physical Assessment", titleFr: "Elite Clinique: Bilan Physique", provider: "عيادة النخبة الرياضية", providerEn: "Elite Sports Clinic", providerFr: "Clinique Elite Sport", price: 8000, rating: 4.7, reviews: 89, badge: "جديد", badgeEn: "New", badgeFr: "Nouveau", color: "from-blue-500 to-cyan-600" },
  { id: 4, category: "media", iconKey: "media", title: "تصوير وإنتاج الملف الإعلامي", titleEn: "Media Profile Production", titleFr: "Production Profil Médiatique", provider: "أستوديو المحترف", providerEn: "Pro Studio DZ", providerFr: "Pro Studio DZ", price: 12000, rating: 4.6, reviews: 63, badge: "", badgeEn: "", badgeFr: "", color: "from-purple-500 to-violet-600" },
  { id: 5, category: "coaching", iconKey: "report", title: "تقرير مراقبة الأداء الأسبوعي", titleEn: "Weekly Performance Report", titleFr: "Rapport Performance Hebdo", provider: "خبراء بيانات النخبة", providerEn: "Elite Data Experts", providerFr: "Elite Data Experts", price: 3500, rating: 4.5, reviews: 77, badge: "", badgeEn: "", badgeFr: "", color: "from-rose-500 to-pink-600" },
  { id: 6, category: "legal", iconKey: "transfer", title: "تمثيل تفاوض الانتقالات", titleEn: "Transfer Negotiation Rep.", titleFr: "Représentation Transferts", provider: "وكالة النقل الرياضي", providerEn: "Sport Transfer Agency", providerFr: "Agence Transferts Sport", price: 25000, rating: 4.9, reviews: 34, badge: "حصري", badgeEn: "Exclusive", badgeFr: "Exclusif", color: "from-amber-600 to-orange-600" },
];

export type Plan = {
  key: "bronze" | "silver" | "gold";
  color: string; price: number; featured: boolean;
  name: string; nameEn: string; nameFr: string;
  features: { ar: string[]; en: string[]; fr: string[] };
};

export const PLANS: Plan[] = [
  { key: "bronze", color: "#CD7F32", price: 15000, featured: false,
    name: "برونز", nameEn: "Bronze", nameFr: "Bronze",
    features: {
      ar: ["الوصول إلى 50 ملف لاعب شهرياً", "5 عروض رسمية / شهر", "فلاتر بحث أساسية", "دعم عبر البريد الإلكتروني", "تقرير شهري واحد"],
      en: ["Access to 50 player profiles/mo", "5 official offers/month", "Basic search filters", "Email support", "1 monthly report"],
      fr: ["Accès 50 profils joueurs/mois", "5 offres officielles/mois", "Filtres basiques", "Support email", "1 rapport mensuel"],
    }},
  { key: "silver", color: "#C0C0C0", price: 40000, featured: false,
    name: "فضي", nameEn: "Silver", nameFr: "Silver",
    features: {
      ar: ["وصول غير محدود لملفات اللاعبين", "20 عرضاً رسمياً / شهر", "فلاتر بحث متقدمة", "دعم ذو أولوية", "تقارير أسبوعية + تحليلات", "أداة مقارنة اللاعبين"],
      en: ["Unlimited player profile access", "20 official offers/month", "Advanced search filters", "Priority support", "Weekly reports + analytics", "Player comparison tool"],
      fr: ["Accès illimité aux profils", "20 offres officielles/mois", "Filtres avancés", "Support prioritaire", "Rapports hebdo + analyses", "Comparaison de joueurs"],
    }},
  { key: "gold", color: "#D4AF37", price: 100000, featured: true,
    name: "ذهب النخبة", nameEn: "Elite Gold", nameFr: "Elite Or",
    features: {
      ar: ["كل مزايا الفضي", "عروض رسمية غير محدودة", "API مخصص للتكامل", "مدير حساب مخصص", "وصول مبكر للمواهب", "تقارير استخباراتية حصرية", "شارة النادي المميز", "دعم 24/7"],
      en: ["Everything in Silver", "Unlimited official offers", "Dedicated API access", "Personal account manager", "Early access to new talents", "Exclusive intelligence reports", "Featured Club badge", "24/7 round-the-clock support"],
      fr: ["Tout le Silver inclus", "Offres officielles illimitées", "Accès API dédié", "Gestionnaire de compte dédié", "Accès anticipé aux talents", "Rapports exclusifs", "Badge Club Mis en Avant", "Support 24/7"],
    }},
];

export const formatDZD = (v: number) => new Intl.NumberFormat("fr-DZ").format(v);

export const playerName = (p: Player, lang: Lang) => lang === "ar" ? p.name : lang === "fr" ? p.nameFr : p.nameEn;
export const playerClub = (p: Player, lang: Lang) => lang === "ar" ? p.club : lang === "fr" ? p.clubFr : p.clubEn;
export const playerWilaya = (p: Player, lang: Lang) => lang === "ar" ? p.wilaya : lang === "fr" ? p.wilayaFr : p.wilayaEn;

export type Lang = "ar" | "en" | "fr";
