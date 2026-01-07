# Bookia Integrácia - Návod

## Prehľad

Bookia je slovenský rezervačný systém, ktorý umožňuje online rezervácie pre wellness centrá. Tento dokument popisuje, ako integrovať Bookia do vašich Next.js webových stránok.

## Krok 1: Získanie Bookia ID

1. **Zaregistrujte sa na Bookia.sk**
   - Navštívte https://bookia.sk
   - Vytvorte si účet
   - Nastavte svoje služby, dostupnosť a cenník

2. **Získajte svoj Bookia ID**
   - Po prihlásení do Bookia dashboardu
   - Prejdite do sekcie "Integrácia" alebo "Widget"
   - Nájdite svoj **Bookia ID** (zvyčajne číslo alebo reťazec)

## Krok 2: Nastavenie Environment Variables

V každom projekte (wellness-families a wellness-adults) vytvorte súbor `.env.local`:

```bash
# wellness-families/.env.local
NEXT_PUBLIC_BOOKIA_ID=vas_bookia_id_tu

# wellness-adults/.env.local  
NEXT_PUBLIC_BOOKIA_ID=vas_bookia_id_tu
```

**DÔLEŽITÉ:** Obe stránky MUSIA používať **rovnaký Bookia ID**, aby zdieľali jeden dashboard!

## Krok 3: Spôsoby integrácie

Bookia typicky ponúka niekoľko spôsobov integrácie:

### Spôsob 1: Widget Script (aktuálna implementácia)

Aktuálna implementácia používa widget script. Bookia widget sa načíta automaticky na stránke `/rezervacia`.

**Aktuálny kód:**
```tsx
// lib/bookia.tsx
<BookiaWidget bookiaId={process.env.NEXT_PUBLIC_BOOKIA_ID} />
```

### Spôsob 2: Iframe Embed (ak Bookia poskytuje embed URL)

Ak Bookia poskytuje priamy embed URL, môžete použiť iframe:

```tsx
// lib/bookia.tsx
<BookiaIframe embedUrl="https://bookia.sk/rezervacia/vas-id" />
```

### Spôsob 3: Priamy odkaz

Najjednoduchší spôsob - presmerovanie na Bookia stránku:

```tsx
<Link href="https://bookia.sk/rezervacia/vas-id">
  Rezervovať teraz
</Link>
```

## Krok 4: Kontrola implementácie

1. **Skontrolujte, či máte nastavený Bookia ID:**
   ```bash
   # V každom projekte
   cat .env.local
   ```

2. **Spustite vývojový server:**
   ```bash
   npm run dev
   ```

3. **Navštívte stránku rezervácie:**
   - http://localhost:3000/rezervacia (wellness-families)
   - http://localhost:3001/rezervacia (wellness-adults)

4. **Skontrolujte konzolu prehliadača:**
   - Otvorte Developer Tools (F12)
   - Skontrolujte, či sa načítal Bookia script
   - Skontrolujte, či nie sú chyby

## Krok 5: Prispôsobenie Bookia widgetu

V Bookia dashboarde môžete:
- Upraviť farby widgetu
- Zmeniť jazyk
- Nastaviť predvolené služby
- Pridať vlastné CSS (ak podporované)

## Riešenie problémov

### Widget sa nenačítava

1. **Skontrolujte Bookia ID:**
   - Uistite sa, že ID je správne v `.env.local`
   - Skontrolujte, či ID nie je v `quotes` (malo by byť bez úvodzoviek)

2. **Skontrolujte Bookia dokumentáciu:**
   - Možno sa zmenil spôsob integrácie
   - Skontrolujte aktuálnu dokumentáciu na bookia.sk

3. **Skontrolujte konzolu:**
   - Otvorte Developer Tools
   - Pozrite sa na Network tab - či sa načítal script
   - Pozrite sa na Console - či nie sú chyby

### Widget sa zobrazuje, ale nefunguje

1. **Skontrolujte Bookia nastavenia:**
   - Uistite sa, že máte nastavené služby v Bookia
   - Skontrolujte, či máte nastavenú dostupnosť

2. **Kontaktujte Bookia podporu:**
   - info@bookia.sk
   - Alebo cez Bookia dashboard

## Alternatívne riešenia

Ak Bookia widget nefunguje, môžete:

1. **Použiť iframe** (ak Bookia poskytuje embed URL)
2. **Použiť priamy odkaz** na Bookia stránku
3. **Kontaktovať Bookia podporu** pre pomoc s integráciou

## Aktuálna implementácia

Súbory:
- `wellness-families/lib/bookia.tsx` - Bookia widget komponenta
- `wellness-families/app/rezervacia/page.tsx` - Stránka s rezerváciou
- `wellness-adults/lib/bookia.tsx` - Bookia widget komponenta  
- `wellness-adults/app/rezervacia/page.tsx` - Stránka s rezerváciou

Obe stránky používajú rovnaký Bookia ID z environment variable.

## Ďalšie kroky

1. Získajte Bookia ID z vášho Bookia účtu
2. Vytvorte `.env.local` súbory v oboch projektoch
3. Pridajte Bookia ID do oboch súborov
4. Reštartujte vývojové servery
5. Otestujte rezervácie na oboch stránkach







