import { getUserIntegration } from "@/lib/server/services/social_integration";
import ConnectionContainer from "@/modules/connections/container/connection_containet";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ConnectionPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const integrations = await getUserIntegration(userId);

  return (
    <div className="h-full w-full overflow-y-auto">
      <ConnectionContainer integrations={integrations ?? []} />
    </div>
  );
}
