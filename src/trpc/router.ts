import { usersRouter } from "@/db/users/router";
import { router } from "./init";

export const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
