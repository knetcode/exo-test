import { publicProcedure, router } from "@/trpc/init";
import { userCreate, userDelete, userFindAll, userFindById, userUpdate } from "./actions";
import { userDbSchema } from "./schema";
import z from "zod";

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    const users = await userFindAll();
    return users;
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await userFindById(input);
    return user;
  }),

  create: publicProcedure.input(userDbSchema).mutation(async ({ input }) => {
    const user = await userCreate(input);
    return user;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const user = await userDelete(input);
    return user;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        ...userDbSchema.shape,
      })
    )
    .mutation(async ({ input }) => {
      const updatedUser = await userUpdate(input, input.id);
      return updatedUser;
    }),
});
