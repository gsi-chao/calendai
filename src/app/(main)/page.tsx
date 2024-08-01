import { getUserTasks } from "@/lib/server/services/task";
import CalendarContainer from "@/modules/calendar/containers/calendar";
import { auth } from "@clerk/nextjs/server";

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
