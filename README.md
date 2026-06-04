# Elite Mercato

## التشغيل السريع (Quick Start)

### 1. تثبيت الاعتماديات

```bash
# باستخدام bun (المفضل)
bun install

# أو باستخدام npm
npm install
```

### 2. إعداد متغيرات البيئة (.env)

قبل التشغيل، أنشئ ملف `.env` من القالب:

```bash
cp .env.example .env
```

ثم املأ القيم الحقيقية من لوحة التحكم:

| المتغير | مكان الحصول عليه |
|---------|-----------------|
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | Dashboard → Settings → API → URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_PUBLISHABLE_KEY` | Dashboard → Settings → API → `anon` public key |
| `VITE_SUPABASE_PROJECT_ID` | Dashboard → Settings → General → Reference ID |

> ⚠️ **لا ترفع** ملف `.env` إلى Git! هو مدرج في `.gitignore` افتراضياً.

### 3. تشغيل خادم التطوير

```bash
# السكربت السريع
bun run start

# أو
npm run start

# البديل: سكربت dev الأصلي
bun run dev
npm run dev
```

### 3. البناء للإنتاج
```bash
bun run build
# أو
npm run build
```

### 4. معاينة البناء
```bash
bun run preview
# أو
npm run preview
```

---

## سكربتات package.json

| السكربت | الوصف |
|---------|-------|
| `start` / `dev` | تشغيل خادم التطوير السريع |
| `build` | بناء التطبيق للإنتاج |
| `build:dev` | بناء بوضع التطوير |
| `preview` | معاينة البناء محلياً |
| `lint` | فحص الأخطاء البرمجية |
| `format` | تنسيق الكود تلقائياً |
| `setup` | تثبيت الاعتماديات عبر bun |
| `setup:npm` | تثبيت الاعتماديات عبر npm |
