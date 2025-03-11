"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Calendar = () => {
  const calendarRef = useRef(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);

  const { data } = useSWR("/api/google", fetcher);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (data) {
      setEvents(
        data?.calendar?.items?.map((event: any) => ({
          id: event.id,
          title: event.summary,
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          description: event.description || "No description available",
        })) || []
      );
    }
  }, [data]);

  // Handle event click and position the popover
  const handleEventClick = (info: any) => {
    const rect = info.jsEvent.target.getBoundingClientRect();
    const top = rect.top + window.scrollY + 30;
    const left = rect.left + window.scrollX + rect.width / 2; // Center the popover

    if (selectedEvent?.id === info.event.id) {
      setSelectedEvent(null);
      setPopoverPosition(null);
    } else {
      setSelectedEvent({
        id: info.event.id,
        title: info.event.title,
        start: info.event.start?.toISOString(),
        end: info.event.end?.toISOString(),
        description: info.event.extendedProps.description,
      });
      setPopoverPosition({ top, left });
    }
  };

  // Close popover when clicking outside
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

  if (!isMounted) return null;

  return (
    <div className="w-full h-full overflow-auto ">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        editable
        selectable
        events={events}
        eventClick={handleEventClick}
      />

      {/* Event Details Popover */}
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