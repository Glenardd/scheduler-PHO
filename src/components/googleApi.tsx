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
import { Button } from "./ui/button";

export default function googleApi() {

  const [data, setData] = useState<{ events?: any }>();

  useEffect(() => {
    fetch("/api/google").then((res) => res.json()).then((data) => setData(data));
  }, []);

  const event = data?.events?.items;

  //short time format
  const timeFormat = (time: any) => {
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", {timeStyle: "short"}).format(timeShort);
    return shortTime;
  };

  //dateFormat
  const dateFormat = (time: any) => {
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", {dateStyle: "long"}).format(timeShort);
    return shortTime;
  };

  console.log(data?.events?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))

  return (
    <SignedIn>
      {
        event?.map((event: any, i: number) => {
          return (
            <div key={i}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle>{event?.summary}</CardTitle>
                      <CardDescription>
                        <span>by {event?.organizer?.displayName}<br />{event?.organizer?.email}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span>{event?.description}</span>
                    </CardContent>
                  </div>
                  <div className="p-5 gap-4">
                    <CardContent>
                      <div className="grid grid-flow-col grid-rows-1 gap-6">
                        <div className="mt-6 grid grid-flow-col grid-rows-2 gap-6">
                          {/* date */}
                          <div>
                            <span className="text-xl self-center font-semibold">{dateFormat(event?.end?.dateTime)}</span>
                          </div>
                          {/* time */}
                          <span className="justify-self-start self-center text-xl">{timeFormat(event?.start?.dateTime)}-{timeFormat(event?.end?.dateTime)}</span>
                        </div>
                        <Button className="self-center">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          )
        }).reverse()
      }
    </SignedIn>
  );
}
