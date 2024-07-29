import { getUserTasks } from "@/lib/server/services/task";
import { auth } from "@clerk/nextjs/server";
import CalendarContainer from "./containers/calendar";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User id is required");
  }

  const tasks = await getUserTasks(userId);
  return (
    <div className="h-full w-full overflow-y-auto">
      <CalendarContainer tasks={tasks} />
    </div>
  );
}
