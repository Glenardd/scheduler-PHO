"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import useSWR from "swr";
import { format } from "date-fns";

import CalendarDialogBox from "./calendarDialogBox";
import { Label } from "../ui/label";

export default function Calendar() {
    const [holidays, setHolidays] = useState<any[]>([]);

    //clicked selected items
    const [selectedDate, setSelectedDate] = useState<string | any>({});

    const calendarRef = useRef<FullCalendar>(null);

    //fetch the events
    const { data } = useSWR("/api/mongodb", (url) => fetch(url, { method: "GET" }).then((res) => res.json()));

    // get color by type
    const getColorByType = (type: string) => {
        switch (type) {
            case 'PHO': return '#AEC6FF';
            case 'MHO': return '#FDFD96';
            case 'DOH': return '#77DD77';
            case 'Holiday': return '#FF6961';
        };
    };

    //program events
    const programEvents = data?.data
        .filter((event: any) => event.approved === "Yes")
        .map((event: any) => ({
            id: event._id,
            title: event.event_title,
            start: event.date_start,
            end: event.date_end,
            color: getColorByType(event.event_from),
            extendedProps: { type: "program_events", from: event.event_from },
        })) || [];

    //holidays
    const fetchHolidays = async (year: number) => {
        try {
            const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
            const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID!;

            if (!GOOGLE_API_KEY || !CALENDAR_ID) {
                throw new Error("Missing Google API Key or Calendar ID environment variables.");
            }

            const timeMin = encodeURIComponent(`${year}-01-01T00:00:00Z`);
            const timeMax = encodeURIComponent(`${year}-12-31T23:59:59Z`);

            const uri = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

            //fetch holiday from the uri
            const res = await fetch(uri, { method: "GET", cache: "default" });
            const data = await res.json();

            // get information about the holiday
            // in json format
            const holidays = data?.items?.map((event: any) => ({
                id: event.id,
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
                color: "#f87171",
                extendedProps: { type: "holiday" },
            })) || [];

            return holidays;

        } catch (error) {
            console.error("Error fetching holidays:", error);
        };
    };

    //returns years
    const fetchYears = () => {
        const startYear = 1960; // Starting year
        const yearsOffset = 200;
        const currentYear = new Date().getFullYear();
        const start_to_end = currentYear + yearsOffset;

        const years = Array.from({ length: start_to_end - startYear + 1 }, (_, i) => startYear + i);
        return years;
    };

    // apply all years to the fetchHolidays function
    const years_Holidays = async () => {
        const years = fetchYears();
        const holidaysArray = await Promise.all(
            years.map(async (year: number) => {
                const holidays = await fetchHolidays(year);
                return holidays || [];
            })
        );
        return holidaysArray.flat();
    };

    //when clicking dates only
    const handleClickDates = (args: string | any) => {
        const date = args.dateStr;
        const clickedDate = new Date(date);
        const events = calendarRef.current?.getApi().getEvents();

        const matchedEvents = events?.filter(e => {
            const start = new Date(e.startStr);
            const end = new Date(e.endStr || e.startStr);
            return clickedDate >= start && clickedDate <= end;
        }) || [];

        setSelectedDate({
            date: format(clickedDate, "MMMM dd, yyyy"),
            events: matchedEvents,
        });
    };

    //for updating the calendar
    useEffect(() => {
        years_Holidays().then((holidays) => setHolidays(holidays));
    }, []);

    //caching to avoid re-renders
    const events = useMemo(() => holidays, [holidays]);

    return (
        <>
            <div className="m-5">
                <div className="flex justify-center gap-4 m-4">
                    <Label>PHO</Label><Label style={{ backgroundColor: `${getColorByType("PHO")}`, width: "20px" }}></Label>
                    <Label>MHO</Label><Label style={{ backgroundColor: `${getColorByType("MHO")}`, width: "20px" }}></Label>
                    <Label>DOH</Label><Label style={{ backgroundColor: `${getColorByType("DOH")}`, width: "20px" }}></Label>
                    <Label>Holiday</Label><Label style={{ backgroundColor: `${getColorByType("Holiday")}`, width: "20px" }}></Label>
                </div>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    dayCellDidMount={(info) => {
                        // Add hover effect
                        info.el.addEventListener("mouseenter", () => {
                            info.el.style.backgroundColor = "#f3f4f6"; // Tailwind gray-100
                        });
                        info.el.addEventListener("mouseleave", () => {
                            info.el.style.backgroundColor = ""; // Reset to default
                        });
                    }}
                    events={[...events, ...programEvents]}
                    dateClick={handleClickDates}
                    height="auto"
                    contentHeight={800}
                    eventTextColor="black"
                    initialView="dayGridMonth"
                />
            </div>
            <CalendarDialogBox events={selectedDate} />
        </>
    );
};
