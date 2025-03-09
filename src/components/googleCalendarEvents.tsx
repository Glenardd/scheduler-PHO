"use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import useSWR from "swr"

import { SignedIn } from "@clerk/nextjs";

import DeleteButton from "./deleteButton";
import EditButton from "./editButton";

export default function googleApi() {

  const {data} = useSWR("/api/google", (url)=> fetch(url, {method:"GET"}).then((res)=> res.json()));

  const event = data?.calendar?.items;  
  
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
    <SignedIn>
      <div>
      {
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Health Celebrations</TableHead>
              <TableHead>DAY/DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              event?.map((event: any) => {
                const eventId = event?.id;
                return (
                  <TableRow key={eventId}>
                    <TableCell>{event?.summary}</TableCell>
                    <TableCell>{dateFormat(event?.end?.dateTime)}</TableCell>
                    <TableCell><DeleteButton eventId={eventId} /></TableCell>
                    <TableCell><EditButton eventId={eventId} /></TableCell>
                  </TableRow>
                )
              }).reverse()
            }
          </TableBody>
        </Table>
      }
      </div>
    </SignedIn>
  );
}
