"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { useEffect, useState } from "react";

export default function googleApi() {

  const [data, setData] = useState<{ events?: any }>();

  useEffect(()=>{
    fetch("/api/google").then((res)=> res.json()).then((data) => setData(data));
  },[]);

  const event = data?.events?.items;

  console.log(data?.events?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))
  
  return (
    <>
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
                        <div className="items-center">
                          {event?.start?.dateTime}
                        </div>
                        <div className="items-center">
                          {event?.start?.timeZone}
                        </div> 
                      </CardContent>
                    </div>
                </div>
              </Card>
            </div>
          )
        }).reverse()
      }
    </>
  );
}
