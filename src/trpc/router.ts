import { usersRouter } from "@/db/users/router";
import { occupationsRouter } from "@/db/occupations/router";
import { router } from "./init";

export const appRouter = router({
  users: usersRouter,
  occupations: occupationsRouter,
});

export type AppRouter = typeof appRouter;
