import { _tasks } from "@/lib/server/_mock/events";
import { CalendarTask } from "@/lib/server/types";
import CalendarContainer from "./containers/calendar";

export default function Home() {
  const events: CalendarTask[] = _tasks;
  return (
    <div className="h-full w-full overflow-y-auto">
      <CalendarContainer events={events} />
    </div>
  );
}
