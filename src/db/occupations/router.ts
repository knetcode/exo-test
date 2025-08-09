import { publicProcedure, router } from "@/trpc/init";
import { occupationById, occupationFindAll } from "./actions";
import { z } from "zod";

export const occupationsRouter = router({
  list: publicProcedure.query(async () => {
    const occupations = await occupationFindAll();
    return occupations;
  }),

  getById: publicProcedure.input(z.uuid()).query(async ({ input }) => {
    const occupation = await occupationById(input);
    return occupation;
  }),
});
