# Wellness Multi-Brand Websites - Implementation Summary

## ✅ Dokončené

Vytvorené sú dva samostatné Next.js webové projekty pre wellness centrum:

### 1. **wellness-families** - Wellness pre rodiny s deťmi
- Branding: Modrá farba (blue-600)
- Zameranie: Rodinné služby, bezpečné prostredie pre deti
- URL: `/wellness-families/`

### 2. **wellness-adults** - Wellness pre dospelých
- Branding: Fialová farba (purple-600)
- Zameranie: Exkluzívne, tiché prostredie pre dospelých
- URL: `/wellness-adults/`

## 📁 Štruktúra projektov

Oba projekty majú rovnakú štruktúru:

```
/project-name/
  /app/
    /page.tsx          # Hlavná stránka
    /o-nas/            # O nás
    /sluzby/           # Služby
    /galeria/          # Galéria
    /cennik/           # Cenník
    /kontakt/          # Kontakt
    /rezervacia/       # Rezervácia (s Bookia widgetom)
    /layout.tsx        # Hlavný layout
    /sitemap.ts        # SEO sitemap
    /robots.ts         # SEO robots.txt
  /components/
    /Header.tsx        # Navigácia
    /Footer.tsx        # Pätička
    /Hero.tsx          # Hlavný banner
    /Services.tsx      # Sekcia služieb
  /lib/
    /bookia.tsx        # Bookia integrácia
```

## 🔧 Nastavenie

### 1. Inštalácia závislostí

Pre každý projekt:

```bash
cd wellness-families
npm install

cd ../wellness-adults
npm install
```

### 2. Konfigurácia Bookia

**DÔLEŽITÉ:** Obe stránky musia používať **rovnaký Bookia ID** na zdieľanie jedného dashboardu.

1. Vytvorte `.env.local` súbor v každom projekte:
```bash
cd wellness-families
cp .env.example .env.local

cd ../wellness-adults
cp .env.example .env.local
```

2. Pridajte svoj Bookia ID do oboch `.env.local` súborov:
```
NEXT_PUBLIC_BOOKIA_ID=vas_bookia_id_tu
```

### 3. Spustenie vývoja

```bash
# Wellness pre rodiny
cd wellness-families
npm run dev
# Otvorí sa na http://localhost:3000

# Wellness pre dospelých (v novom termináli)
cd wellness-adults
npm run dev
# Otvorí sa na http://localhost:3000
```

## 🎨 Branding

### Wellness Families (Rodiny)
- **Hlavná farba:** Modrá (`blue-600`)
- **Názov:** Wellmass Family
- **Zameranie:** Rodiny s deťmi, bezpečné prostredie
- **Obsah:** Rodinné služby, detské masáže, rodinná sauna

### Wellness Adults (Dospelí)
- **Hlavná farba:** Fialová (`purple-600`)
- **Názov:** Wellmass Premium
- **Zameranie:** Dospelí, tiché prostredie
- **Obsah:** Exkluzívne služby, terapeutické masáže, súkromná sauna

## 📄 Stránky

Oba projekty obsahujú rovnaké stránky:

1. **Úvod** (`/`) - Hero sekcia, úvodný text, služby
2. **O nás** (`/o-nas`) - Informácie o wellness centre
3. **Služby** (`/sluzby`) - Detailný popis služieb
4. **Galéria** (`/galeria`) - Galéria obrázkov (pripravená na skutočné fotky)
5. **Cenník** (`/cennik`) - Cenník služieb
6. **Kontakt** (`/kontakt`) - Kontaktné informácie, otváracie hodiny
7. **Rezervácia** (`/rezervacia`) - Bookia rezervačný widget

## 🔌 Bookia integrácia

Bookia widget je integrovaný cez:
- `/lib/bookia.tsx` - React komponenta pre Bookia widget
- Používa sa na stránke `/rezervacia`
- Konfiguruje sa cez environment variable `NEXT_PUBLIC_BOOKIA_ID`

**Poznámka:** Skutočná Bookia integrácia môže vyžadovať:
- Skontrolovanie správneho Bookia embed URL alebo widget script
- Možno bude potrebné upraviť `lib/bookia.tsx` podľa oficiálnej Bookia dokumentácie

## 🚀 Deployment

Oba projekty sú pripravené na deployment na Vercel:

1. Pushnite kód do Git repozitára
2. Pripojte projekty k Vercel
3. Nastavte environment variables (`NEXT_PUBLIC_BOOKIA_ID`)
4. Deploy

Alternatívne môžete buildovať lokálne:
```bash
npm run build
npm start
```

## 📝 Ďalšie kroky

1. **Pridajte skutočné fotografie** do galérie (nahraďte placeholder obrázky)
2. **Aktualizujte cenník** s reálnymi cenami
3. **Skontrolujte Bookia integráciu** - možno bude potrebné upraviť widget podľa oficiálnej dokumentácie
4. **Aktualizujte SEO metadata** - upravte domény v `sitemap.ts` a `robots.ts`
5. **Pridajte tretí brand** (keď bude rozhodnuté)

## 🔍 SEO

- Všetky stránky majú SEO metadata
- Sitemap je automaticky generovaný
- Robots.txt je nakonfigurovaný
- Responsive dizajn pre mobilné zariadenia

## 📞 Kontaktné informácie

Obe stránky používajú rovnaké kontaktné informácie:
- **Adresa:** Ivanská cesta 15, 821 04 Bratislava
- **Email:** inforuzinov@wellmass.sk
- **Otváracie hodiny:**
  - Pondelok – Piatok: 11:00 – 22:00
  - Sobota – Nedeľa: 10:00 – 22:00

## ⚠️ Dôležité poznámky

1. **Bookia ID:** Obe stránky MUSIA používať rovnaký Bookia ID na zdieľanie dashboardu
2. **Domény:** Aktualizujte domény v `sitemap.ts` a `robots.ts` pred nasadením
3. **Fotografie:** Galéria obsahuje placeholder obrázky - nahraďte skutočnými fotkami
4. **Cenník:** Ceny sú označené ako "€XX" - aktualizujte s reálnymi cenami








