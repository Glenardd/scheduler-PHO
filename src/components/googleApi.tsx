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

  useEffect(()=>{
    fetch("/api/google").then((res)=> res.json()).then((data) => setData(data));
  },[]);

  const event = data?.events?.items;

  //
  const dateFormat = (StartDateTime: any) =>{

    const isoDate = StartDateTime;

    const date = new Date(isoDate);

    const format = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

    // const time = format.split('').reduce((acc, char) => {
    //   if (/\w/.test(char) || char === ' ') {
    //     acc += char;
    //   }
    //   return acc;
    // }, '').split(' ');

    return format;

  }

  console.log(data?.events?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))
  
  return (
    <SignedIn>
      {
        event?.map((event: any, i: number)=>{
          return (
            <div key={i}>
              <Card>
                <div className="flex items-center justify justify-between">
                    <div>
                      <CardHeader>
                        <CardTitle>{event?.summary}</CardTitle>
                        <CardDescription>
                          <span>by {event?.organizer?.displayName}<br/>{event?.organizer?.email}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span>{event?.description}</span>
                      </CardContent>
                    </div>
                    <div className="p-5 gap-4">
                      <CardContent>
                        <div className="grid grid-flow-col grid-rows-3 gap-4">
                          <div className="row-span-1 text-xl">
                            <span>{dateFormat(event?.start?.dateTime)}</span>
                            <span>{dateFormat(event?.end?.dateTime)}</span>
                          </div>
                          <div className="col-span-2 row-span-2">
                            <Button>
                            Delete
                            </Button>
                          </div>
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
