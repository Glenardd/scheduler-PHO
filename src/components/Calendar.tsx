"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID!;

const Calendar = () => {
  const calendarRef = useRef(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);
  const [fetchedYears, setFetchedYears] = useState<Set<number>>(new Set());

  useEffect(() => setIsMounted(true), []);

  const fetchHolidays = async (year: number) => {
    if (fetchedYears.has(year)) return;

    try {
      const timeMin = `${year}-01-01T00:00:00Z`;
      const timeMax = `${year}-12-31T23:59:59Z`;

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
      );

      if (!response.ok) throw new Error(`Failed to fetch holidays: ${response.statusText}`);

      const data = await response.json();

      const holidayEvents = data.items.map((holiday: any) => ({
        id: `holiday-${holiday.start.date}`,
        title: holiday.summary,
        start: format(new Date(holiday.start.date), "yyyy-MM-dd"),
        allDay: true,
        color: "#ff0000",
      }));

      setEvents((prevEvents) => [...prevEvents, ...holidayEvents]);
      setFetchedYears((prev) => new Set(prev).add(year));
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const handleDatesSet = (info: any) => {
    const startYear = new Date(info.start).getFullYear();
    const endYear = new Date(info.end).getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      fetchHolidays(year);
    }
  };

  const handleEventClick = (info: any) => {
    const rect = info.jsEvent.target.getBoundingClientRect();
    let top = rect.top + window.scrollY + 30;
    let left = rect.left + window.scrollX + rect.width / 2;

    const popoverWidth = 260;
    const popoverHeight = 120;

    if (left + popoverWidth > window.innerWidth) {
      left = window.innerWidth - popoverWidth - 20;
    }
    if (top + popoverHeight > window.innerHeight) {
      top = rect.top + window.scrollY - popoverHeight - 30;
    }

    if (selectedEvent?.id === info.event.id) {
      setSelectedEvent(null);
      setPopoverPosition(null);
    } else {
      setSelectedEvent({
        id: info.event.id,
        title: info.event.title,
        start: info.event.start?.toISOString(),
        end: info.event.end?.toISOString(),
        description: info.event.extendedProps.description || "No description available",
      });
      setPopoverPosition({ top, left });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setSelectedEvent(null);
        setPopoverPosition(null);
      }
    };

    if (selectedEvent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedEvent]);

  useEffect(() => {
    const handleResize = () => {
      if (selectedEvent) {
        setPopoverPosition(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedEvent]);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full overflow-auto p-2 sm:p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        editable
        selectable
        events={events}
        eventClick={handleEventClick}
        datesSet={handleDatesSet}
        height="auto"
        contentHeight={800}
        initialView="dayGridMonth"
        aspectRatio={1.35}
      />

      {selectedEvent && popoverPosition && (
        <div
          ref={popoverRef}
          className="absolute bg-white shadow-lg rounded-lg p-4 w-64 border z-50 transform -translate-x-1/2"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <h2 className="text-lg font-bold">{selectedEvent.title}</h2>
          <p className="text-sm text-gray-600">
            <strong>Event Date:</strong> {new Date(selectedEvent.start).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Description:</strong> {selectedEvent.description}
          </p>
          <button
            onClick={() => {
              setSelectedEvent(null);
              setPopoverPosition(null);
            }}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
