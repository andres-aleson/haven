This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database

Data lives in Postgres, in the `haven` schema, accessed with [Drizzle ORM](https://orm.drizzle.team). Tables are defined in `src/db/schema.ts` and migrations live in `drizzle/`.

- `DATABASE_URL` is used by the app. It connects as `haven_app`, a role that can only read and write rows in the `haven` schema.
- `MIGRATION_DATABASE_URL` is used only by drizzle-kit, and needs a role that can create tables in `haven`. It is not set on Vercel.

To change the schema, edit `src/db/schema.ts`, then run:

```bash
npm run db:generate   # write a new SQL migration to drizzle/
npm run db:migrate    # apply it (needs MIGRATION_DATABASE_URL)
```

Apply migrations before deploying code that depends on them.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
