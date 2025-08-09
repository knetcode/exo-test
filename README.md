# README.md

## Getting Started

- Clone this repo.
- Ensure you have the latest [NodeJS](https://nodejs.org/en/download) installed on your system.
- The prefered package manage is [PNPM](https://pnpm.io/installation), (alternatively you could use NPM if you prefer)
  - `brew install pnpm`
- From your terminal, cd into the root of this repo
- Run `pnpm install` to install all the dependencies

## Testing

- Run `pnpm dev` to start the local dev server on [http://localhost:3000](http://localhost:3000)
- If you want to test the production build, run `pnpm build ; pnpm start`

## Deployment

- `.env` file will be supplied via email to run locally
- Postgres Database is hosted on my VPS
- This application and database will be shutdown on 2025/08/31

---

### Packages breakdown

- [T3 Env](https://env.t3.gg/docs/core) to help ensure compilation and type-safety on env vars
- [Zod](https://zod.dev/) for schema validation
- [Drizzle ORM](https://orm.drizzle.team/) as ORM of choice
