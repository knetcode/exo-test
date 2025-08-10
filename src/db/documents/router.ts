import { publicProcedure, router } from "@/trpc/init";
import { documentById, documentFindAll, documentUploadMetadata, documentDelete } from "./actions";
import { z } from "zod";

export const documentsRouter = router({
  list: publicProcedure.query(async () => {
    return await documentFindAll();
  }),

  getById: publicProcedure.input(z.uuid()).query(async ({ input }) => {
    return await documentById(input);
  }),

  upload: publicProcedure
    .input(
      z.object({
        name: z.string(),
        size: z.number(),
        contentType: z.string(),
        key: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const document = await documentUploadMetadata(input);
      return document;
    }),

  delete: publicProcedure.input(z.uuid()).mutation(async ({ input }) => {
    const result = await documentDelete(input);
    return result;
  }),
});
