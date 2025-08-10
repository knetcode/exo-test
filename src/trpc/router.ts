import { usersRouter } from "@/db/users/router";
import { occupationsRouter } from "@/db/occupations/router";
import { documentsRouter } from "@/db/documents/router";
import { router } from "./init";

export const appRouter = router({
  users: usersRouter,
  occupations: occupationsRouter,
  documents: documentsRouter,
});

export type AppRouter = typeof appRouter;
