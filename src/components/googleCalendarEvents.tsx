"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useSWR, { useSWRConfig } from "swr"

import { SignedIn } from "@clerk/nextjs";

import DeleteButton from "./deleteButton";
import EditDialog from "./editDialog";

export default function googleApi() {

  const {mutate} = useSWRConfig();

  const {data} = useSWR("/api/google", (url)=> fetch(url, {method:"GET"}).then((res)=> res.json()));

  const event = data?.calendar?.items;

  const handleDelete = async (eventId: any) => {
    await fetch(`/api/google?id=${eventId}`, {
      method: "DELETE",
    });

    mutate("/api/google");
  };  
  
  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  // short time format
  // const timeFormat = (time: any) => {
  //   if (!isValidDate(time)) return "Invalid time";
  //   const timeShort = new Date(time);
  //   const shortTime = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(timeShort);
  //   return shortTime;
  // };

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
                  {/* <span className="font-semibold text-md md:text-xl">{timeFormat(event?.start?.dateTime)}-{timeFormat(event?.end?.dateTime)}</span> */}
                </CardContent>
              </div>
              {/* footer */}
              <CardFooter className="flex items-center justify-between">
                <CardDescription>
                  <span>Meeting created by: {event?.organizer?.displayName || "unknown"}</span>
                  {/* <span>{event?.organizer?.email}</span> */}
                </CardDescription>
                <div className="flex gap-2">
                  <DeleteButton eventId={eventId} onDelete={handleDelete}/>
                  <EditDialog eventId={eventId}/>
                </div>
              </CardFooter>
            </Card>
          )
        }).reverse()
      }
      </div>
    </SignedIn>
  );
}
