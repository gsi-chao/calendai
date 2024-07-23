"use client";

import { CalendarTask } from "@/lib/server/types";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as datefns from "date-fns";

type Props = {
  events: CalendarTask[];
  onEventClick?: (event: DateClickArg) => void;
  calendarRef?: React.RefObject<FullCalendar>;
} & CalendarOptions;

export default function Calendar({
  height,
  events,
  onEventClick,
  customButtons,
  calendarRef,
  ...props
}: Props) {
  const handleDateClick = (arg: DateClickArg) => {
    console.log(arg);
    onEventClick?.(arg);
  };

  console.log(Object.keys(customButtons ?? {}).join(","));

  const mapTaskToEvent = (calendarTask: CalendarTask) => ({
    title: calendarTask.task.title,
    start: calendarTask.postDate,
    end: datefns.addHours(calendarTask.postDate, 1),
  });

  return (
    <FullCalendar
      {...props}
      ref={calendarRef}
      customButtons={customButtons}
      height={height}
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      nowIndicator
      selectable
      editable
      selectMirror
      events={events.map(mapTaskToEvent)}
      scrollTime={new Date().getHours() + ":00:00"}
      allDaySlot={false}
      slotLabelInterval={{ hours: 1 }}
      contentHeight={200}
      dateClick={handleDateClick}
      views={{
        timeGridWeek: {
          type: "timeGridWeek",
          duration: { days: 7 },

          buttonText: "Week",
        },
        dayGridMonth: {
          type: "dayGridMonth",
          buttonText: "Month",
          nowIndicator: true,
        },
      }}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: `timeGridWeek,dayGridMonth${
          customButtons && `,${Object.keys(customButtons).join(",")}`
        }`,
      }}
    />
  );
}
