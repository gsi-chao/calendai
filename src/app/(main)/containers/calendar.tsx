"use client";

import Calendar from "@/components/calendar/calendar";
import { CalendarTask } from "@/lib/server/types";
import { CustomButtonInput } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";
import { mapTasksToEvents } from "../adapters/events";
import { NewTask } from "../components/task/new-task";

type Props = {
  tasks: CalendarTask[];
};

const CalendarContainer = ({ tasks }: Props) => {
  const [open, setOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();

  const handleEventClick = () => {
    setOpen(true);
  };

  const handleDateClick = (arg: DateClickArg) => {
    setDefaultDate(arg.date);
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
      <NewTask
        open={open}
        onOpenChange={() => setOpen(!open)}
        defaultDate={defaultDate}
      />
      <Calendar
        calendarRef={calendarRef}
        height="calc(100vh - 64px"
        events={mapTasksToEvents(tasks)}
        customButtons={customButtons()}
        onEventClick={handleDateClick}
      />
    </>
  );
};

export default CalendarContainer;
