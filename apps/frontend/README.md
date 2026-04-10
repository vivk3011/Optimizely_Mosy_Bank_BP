This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Multisite Setup (Optimizely SaaS CMS)

This app supports host-based multisite routing with per-site locale and start-page behavior.

### Core configuration

Configure sites in [src/lib/site-config.ts](src/lib/site-config.ts):

- `siteId`: must match the Optimizely SaaS CMS Application API ID
- `hosts`: hostnames that map to this site
- `locales`: supported locales for this host
- `defaultLocale`: locale used when URL has no language prefix
- `prefixDefaultLocale`: set to `true` when default locale must be in URL
- `resolverBaseUrl`: base URL used for route resolution in Graph
- `startPagePath`: site start page path (for example `/` or `/home`)

### Environment-driven multisite

You can fully define sites through `OPTIMIZELY_MULTISITE_CONFIG` as JSON.

Example:

```json
[
	{
		"siteId": "moseybank",
		"hosts": ["site-a.localtest.me"],
		"locales": ["en", "en_GB", "fr", "pl", "sv"],
		"defaultLocale": "en",
		"prefixDefaultLocale": false,
		"resolverBaseUrl": "http://site-a.localtest.me:3001",
		"startPagePath": "/"
	},
	{
		"siteId": "moseybanksite",
		"hosts": ["site-b.localtest.me"],
		"locales": ["en", "en_GB", "fr", "pl", "sv"],
		"defaultLocale": "en",
		"prefixDefaultLocale": true,
		"resolverBaseUrl": "http://site-b.localtest.me:3001",
		"startPagePath": "/home"
	}
]
```

### Request flow

- Middleware resolves site by host and locale by path.
- Middleware applies start-page redirects for root paths.
- Site/locale/start-page context is passed through request headers and cookies.
- Loaders use this context for Graph route/content resolution.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
