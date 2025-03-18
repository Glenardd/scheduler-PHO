"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import useSWR from "swr"

import { SignedIn } from "@clerk/nextjs";

import DeleteButton from "./deleteButton";
import EditButton from "./editButton";
import AddEventButton from "./addEventButton";

export default function googleCalendarEvents() {

  const { data } = useSWR("/api/mongodb", (url) => fetch(url, { method: "GET" }).then((res) => res.json()));

  const event = data?.data;

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  // date format
  const dateFormat = (time: any) => {
    if (!isValidDate(time)) return "Invalid date";
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(timeShort);
    return shortTime;
  };

  // console.log(data?.calendar?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))

  return (
    <div>
      <SignedIn>
        <AddEventButton />
      </SignedIn>
      {
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Health Celebrations</TableHead>
              <TableHead>DAY/DATE</TableHead>
              <TableHead>Event from</TableHead>
              <TableHead>Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              event?.map((event: any) => {
                const eventId = event?._id;
                return (
                  <TableRow key={eventId}>
                    <TableCell>{event?.event_title}</TableCell>
                    <TableCell>{dateFormat(event?.date)}</TableCell>
                    <TableCell>{event?.event_from}</TableCell>
                    <TableCell>{event?.approved}</TableCell>
                    <SignedIn>
                      <TableCell><EditButton eventId={eventId} /></TableCell>
                      <TableCell><DeleteButton eventId={eventId} /></TableCell>
                    </SignedIn>
                  </TableRow>
                )
              }).reverse()
            }
          </TableBody>
        </Table>
      }
    </div>
  );
}
