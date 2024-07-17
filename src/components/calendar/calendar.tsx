"use client";

import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import FullCalendar from "@fullcalendar/react";

type Props = {} & CalendarOptions;

export default function Calendar({ height }: Props) {
  return (
    <FullCalendar
      height={height}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
}
