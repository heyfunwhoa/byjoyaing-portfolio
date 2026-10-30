"use client";
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
export const academyAuthClient = createAuthClient({
  basePath: "/api/academy/auth",
  plugins: [emailOTPClient()],
});
