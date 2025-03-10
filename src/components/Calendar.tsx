"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Calendar = () => {
  const calendarRef = useRef(null);
  const modalRef = useRef(null); // Ref for detecting outside clicks
  const [events, setEvents] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Handle event click
  const handleEventClick = (info: any) => {
    if (selectedEvent?.id === info.event.id) {
      setIsModalOpen(false); // Toggle off if same event is clicked
      setSelectedEvent(null);
    } else {
      setSelectedEvent({
        id: info.event.id,
        title: info.event.title,
        start: info.event.start?.toISOString(),
        end: info.event.end?.toISOString(),
        description: info.event.extendedProps.description,
      });
      setIsModalOpen(true);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
        setIsModalOpen(false);
        setSelectedEvent(null);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("modal-open"); // Add class when modal is open
    } else {
      document.body.classList.remove("modal-open"); // Remove class when modal is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("modal-open"); // Cleanup
    };
  }, [isModalOpen]);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full overflow-auto">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        editable
        selectable
        events={events}
        eventClick={handleEventClick}
      />

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;