import { initTRPC } from "@trpc/server";
import { ZodError, z } from "zod";

export const t = initTRPC.context().create({
  errorFormatter({ shape, error }) {
    // Handle Zod validation errors
    if (error.cause instanceof ZodError) {
      const firstError = error.cause.issues[0];
      return {
        ...shape,
        message: firstError?.message ?? "Validation error",
        data: {
          ...shape.data,
          zodError: z.treeifyError(error.cause),
        },
      };
    }

    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
