import { getAcademyRuntime } from "@/lib/academy-account/server";
import { handleLearnerAuth } from "@/lib/academy-account/auth-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function handle(request: Request) {
  return handleLearnerAuth(request, getAcademyRuntime());
}
export { handle as GET, handle as POST };
