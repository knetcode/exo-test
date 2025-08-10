# README.md

## Getting Started

- Clone this [repo](https://github.com/knetcode/exo-test).
- Ensure you have the latest [NodeJS](https://nodejs.org/en/download) installed on your system.
- The prefered package manage is [PNPM](https://pnpm.io/installation), (alternatively you could use NPM if you prefer)
  - `brew install pnpm`
- From your terminal, cd into the root of this repo
- Run `pnpm install` to install all the dependencies

## Testing

- `.env.local` file will be supplied via email to run locally
- Run `pnpm dev` to start the local dev server on [http://localhost:3000](http://localhost:3000)
- If you want to test the production build, run `pnpm build ; pnpm start`

## Deployment

- Dcokerized and hosted on my VPS at [https://exo-test.coolify.knetcode.com/](https://exo-test.coolify.knetcode.com/)
- Postgres Database is hosted on my VPS
- Object storage [MinIO](https://docs.min.io/enterprise/aistor-object-store/installation/container/) hosted on my VPS
- This application, database and object storage will be shutdown on 2025/08/31

---

### Packages of note

- [T3 Env](https://env.t3.gg/docs/core) to help ensure compilation and type-safety on env vars
- [Zod](https://zod.dev/) for schema validation
- [Drizzle ORM](https://orm.drizzle.team/) as ORM of choice
- [Shadcn](https://ui.shadcn.com/docs/installation) for decent looking, quick and accessible UI components
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) best way to manage async state
- [tRPC](https://trpc.io/docs) type safe communication from backend to frontend
