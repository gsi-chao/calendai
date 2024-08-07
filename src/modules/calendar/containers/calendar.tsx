"use client";

import Calendar from "@/components/calendar/calendar";
import { getTaskById } from "@/lib/server/services/task";
import { CalendarTask } from "@/lib/server/types";
import { CustomButtonInput, EventClickArg } from "@fullcalendar/core";
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
  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null);

  const handleEventClick = async (arg: EventClickArg) => {
    const response = await getTaskById(+arg.event.id);
    if (response) {
      setSelectedTask(response);
      setOpen(true);
    }
  };

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedTask(null);
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
  
  const onOpenChange = () => {
    setOpen(!open);
    setSelectedTask(null)
  }

  return (
    <>
      <NewTask
        open={open}
        onOpenChange={onOpenChange}
        defaultDate={defaultDate}
        task={selectedTask}
      />
      <Calendar
        calendarRef={calendarRef}
        height="calc(100vh - 64px"
        events={mapTasksToEvents(tasks)}
        customButtons={customButtons()}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
    </>
  );
};

export default CalendarContainer;
