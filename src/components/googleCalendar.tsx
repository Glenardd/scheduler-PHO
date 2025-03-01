"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignedIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import DeleteButton from "./deleteButton";

export default function googleApi() {

  const [data, setData] = useState<{ calendar?: any }>();

  useEffect(() => {
    fetch("/api/google", {method: "GET"}).then((res) => res.json()).then((data) => setData(data));
  }, []);

  const event = data?.calendar?.items;

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  // short time format
  const timeFormat = (time: any) => {
    if (!isValidDate(time)) return "Invalid time";
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(timeShort);
    return shortTime;
  };

  // date format
  const dateFormat = (time: any) => {
    if (!isValidDate(time)) return "Invalid date";
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(timeShort);
    return shortTime;
  };

  console.log(data?.calendar?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))

  return (
    <SignedIn>
      <div className="grid grid-cols-2 gap-4 place-items-center m-6">
      {
        event?.map((event: any, i: number) => {
          
          const eventId =  event?.id;

          return (
            <Card key={i} className="w-full md:w-[650px]">
              {/* header */}
              <div className="flex items-center justify-between flex-shrink-0">
                <CardHeader>
                  <CardTitle className="max-w-15 break-words">{event?.summary}</CardTitle>
                  <span>{event?.description}</span>
                </CardHeader>
                {/* content */}
                <CardContent className="flex flex-col p-5">
                  {/* date */}
                  <span className="font-semibold text-md md:text-xl">{dateFormat(event?.end?.dateTime)}</span>
                  {/* time */}
                  <span className="font-semibold text-md md:text-xl">{timeFormat(event?.start?.dateTime)}-{timeFormat(event?.end?.dateTime)}</span>
                </CardContent>
              </div>
              {/* footer */}
              <CardFooter className="flex justify-between">
                <CardDescription>
                  <span>Meeting created by: {event?.organizer?.displayName || "unkown"}</span>
                  {/* <span>{event?.organizer?.email}</span> */}
                </CardDescription>
                <DeleteButton eventId={eventId}/>
              </CardFooter>
            </Card>
          )
        }).reverse()
      }
      </div>
    </SignedIn>
  );
}
