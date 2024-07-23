"use client";

import Calendar from "@/components/calendar/calendar";
import { CalendarTask } from "@/lib/server/types";
import { CustomButtonInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";
import { NewTask } from "../components/task/new-task";

type Props = {
  events: CalendarTask[];
};

const CalendarContainer = ({ events }: Props) => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null)

  const handleEventClick = () => {
    setOpen(true);
  };

  const customButtons = (): Record<string, CustomButtonInput> => {
    return {
      newTask: {
        text: "New task",
        click: () => setOpen(true),
      },
    };
  };

  return (
    <>
      <NewTask open={open} onOpenChange={() => setOpen(!open)} />
      <Calendar
        calendarRef={calendarRef}
        height="calc(100vh - 64px"
        events={events}
        customButtons={customButtons()}
      />
    </>
  );
};

export default CalendarContainer;
