# Wellness Heaven - Wellness Website

Wellness website for families with children in Bratislava.

## Features

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Bookia booking system integration
- SEO optimized
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your Bookia ID:
```
NEXT_PUBLIC_BOOKIA_ID=your_actual_bookia_id
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Bookia Integration

This site uses Bookia for booking management. Both wellness-families and wellness-adults should use the **same Bookia account ID** to share the same dashboard.

To configure:
1. Get your Bookia account ID from your Bookia dashboard
2. Add it to `.env.local` as `NEXT_PUBLIC_BOOKIA_ID`
3. The widget will automatically load on the `/rezervacia` page

## Deployment

This project is ready to deploy on Vercel:

```bash
npm run build
```

## Pages

- `/` - Homepage
- `/o-nas` - About us
- `/sluzby` - Services
- `/cennik` - Pricing
- `/kontakt` - Contact
- `/rezervacia` - Booking (with Bookia widget)
