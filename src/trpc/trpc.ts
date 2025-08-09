import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "./router";

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();

export function extractErrorMessage(error: unknown): string {
  try {
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return "An unexpected error occurred";
  } catch {
    return "An unexpected error occurred";
  }
}
