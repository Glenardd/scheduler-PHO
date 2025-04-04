"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { format } from "date-fns";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID!;

interface Holiday {
  id: string;
  start: string;
  title: string;
  description?: string;
}

interface EventDetails {
  title: string;
  start: string;
  description?: string;
  type?: "PHO" | "DOH" | "MHO";
}

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [holidaysByYear, setHolidaysByYear] = useState<Map<number, Holiday[]>>(new Map());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedEvent, setSelectedEvent] = useState<Holiday | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"PHO" | "DOH" | "MHO">("PHO");

  const fetchedYears = useRef<Map<number, boolean>>(new Map());

  useEffect(() => {
    if (!fetchedYears.current.has(selectedYear)) {
      fetchHolidays(selectedYear);
    }
  }, [selectedYear]);

  const fetchHolidays = async (year: number) => {
    try {
      const timeMin = `${year}-01-01T00:00:00Z`;
      const timeMax = `${year}-12-31T23:59:59Z`;
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
      );

      if (!response.ok) throw new Error(`Failed to fetch holidays: ${response.statusText}`);

      const data = await response.json();
      if (!data.items) return;

      const holidayEvents: Holiday[] = data.items.map((holiday: any) => ({
        id: holiday.id || `holiday-${holiday.start.date}`,
        title: holiday.summary,
        start: format(new Date(holiday.start.date), "yyyy-MM-dd"),
      }));

      setHolidaysByYear((prev) => new Map(prev).set(year, holidayEvents));
      fetchedYears.current.set(year, true);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const filteredHolidays = useMemo(
    () =>
      holidaysByYear.get(selectedYear)?.filter(
        (holiday) => new Date(holiday.start).getMonth() === selectedMonth
      ) || [],
    [selectedYear, selectedMonth, holidaysByYear]
  );

  // Example mock: replace this with your real source of program events
  const allProgramEvents: EventDetails[] = [
    {
      title: "DOH Health Fair",
      start: `${selectedYear}-${selectedMonth + 1}-10`,
      type: "DOH",
    },
    {
      title: "PHO Training",
      start: `${selectedYear}-${selectedMonth + 1}-15`,
      type: "PHO",
    },
    {
      title: "MHO Vaccination Drive",
      start: `${selectedYear}-${selectedMonth + 1}-22`,
      type: "MHO",
    },
  ];

  const filteredEvents = useMemo(
    () =>
      allProgramEvents.filter(
        (event) =>
          event.type === selectedFilter &&
          new Date(event.start).getFullYear() === selectedYear &&
          new Date(event.start).getMonth() === selectedMonth
      ),
    [selectedYear, selectedMonth, selectedFilter]
  );

  const handleEventClick = useCallback((event: Holiday) => {
    setSelectedEvent(event);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as "PHO" | "DOH" | "MHO");
  };

  return (
    <div className="w-full h-full overflow-auto p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        editable
        selectable
        events={holidaysByYear.get(selectedYear) || []}
        eventClick={(info) => {
          const event: Holiday = {
            id: info.event.id || "",
            title: info.event.title || "",
            start: info.event.start ? info.event.start.toISOString().split("T")[0] : "",
          };
          handleEventClick(event);
        }}
        height="auto"
        contentHeight={800}
        initialView="dayGridMonth"
      />

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] md:w-[60%] lg:w-[50%] h-[80%] overflow-auto relative">
            <h2 className="text-xl font-bold text-center">Event Details</h2>

            {/* Year and Month Selection */}
            <div className="mt-4 flex gap-4 justify-center">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Year:</label>
                <input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border p-2 rounded-md w-24"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Month:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="border p-2 rounded-md"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>
                      {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Events and Holidays */}
            <div className="mt-6 flex gap-6">
              {/* Program Events */}
              <div className="w-1/2 border-r pr-4">
                <h3 className="text-lg font-semibold">Program Events</h3>
                <label className="block text-gray-700 text-sm font-bold mb-2">Filter by:</label>
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="border p-2 rounded-md w-full mb-4"
                >
                  <option value="PHO">PHO</option>
                  <option value="DOH">DOH</option>
                  <option value="MHO">MHO</option>
                </select>

                <ul className="mt-2 text-gray-700 list-disc list-inside">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <li key={index}>
                        {new Date(event.start).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                        : {event.title}
                      </li>
                    ))
                  ) : (
                    <li>No events found for this filter</li>
                  )}
                </ul>
              </div>

              {/* Holiday List Section */}
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">Holidays</h3>
                {filteredHolidays.length > 0 ? (
                  <ul className="pl-4 mt-2 list-disc text-gray-700">
                    {filteredHolidays.map((holiday) => (
                      <li key={holiday.id}>
                        {new Date(holiday.start).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                        : {holiday.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-center mt-2">No holidays for this month</p>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
