import { publicProcedure, router } from "@/trpc/init";
import { userFindAll } from "./actions";

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    const users = await userFindAll();
    return users;
  }),
});
