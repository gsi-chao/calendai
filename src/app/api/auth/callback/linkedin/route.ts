import { getTokenFromCode } from "@/lib/server/integrations/linkedin/oauth";
import { createUserIntegration } from "@/lib/server/services/social_integration";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request): Promise<Response> {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const response = await getTokenFromCode(code ?? "");
  await createUserIntegration(userId, "linkedin", response.access_token);
  redirect("/connections");
}
