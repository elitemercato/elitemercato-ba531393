# Elite Mercato

## التشغيل السريع (Quick Start)

### 1. تثبيت الاعتماديات
```bash
# باستخدام bun (المفضل)
bun install

# أو باستخدام npm
npm install
```

### 2. تشغيل خادم التطوير
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
