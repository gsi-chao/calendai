"use client";

import { CalendarOptions, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

type Props = {
  events: Event[];
  onDateClick?: (event: DateClickArg) => void;
  onEventClick?: (event: EventClickArg) => void;
  calendarRef?: React.RefObject<FullCalendar>;
} & CalendarOptions;

export type Event = {
  title: string;
  start: Date;
  end: Date;
  id: number;
};

export default function Calendar({
  height,
  events,
  onDateClick,
  onEventClick,
  customButtons,
  calendarRef,
  ...props
}: Props) {
  const handleDateClick = (arg: DateClickArg) => {
    onDateClick?.(arg);
  };

  const handleEventClick = (arg: EventClickArg) => {
    onEventClick?.(arg);
  };

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
      editable={false}
      selectMirror
      events={events}
      scrollTime={new Date().getHours() + ":00:00"}
      allDaySlot={false}
      slotLabelInterval={{ hours: 1 }}
      contentHeight={200}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
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
          customButtons && ` ${Object.keys(customButtons).join(",")}`
        }`,
      }}
    />
  );
}
