import { Button } from "@/components/ui/button";
import FullCalendar from "@fullcalendar/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
};

const CalendarToolbar: React.FC<Props> = ({ calendarRef }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        <Button variant="outline">
          <ChevronLeft />
        </Button>
        <Button variant="outline">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
