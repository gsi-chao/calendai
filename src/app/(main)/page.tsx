import { getUserTasks } from "@/lib/server/services/task";
import { CalendarTask } from "@/lib/server/types";
import CalendarContainer from "@/modules/calendar/containers/calendar";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User id is required");
  }
  let tasks: CalendarTask[] = [];
  try {
    tasks = await getUserTasks(userId);
  } catch (e) {
    console.log(e);
  }
  return (
    <div className="h-full w-full overflow-y-auto">
      <CalendarContainer tasks={tasks} />
    </div>
  );
}
