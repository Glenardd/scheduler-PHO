"use client";

import { useEffect, useState } from "react";

export default function googleApi() {

  const [data, setData] = useState<{ events?: any }>();

  useEffect(()=>{
    fetch("/api/google").then((res)=> res.json()).then((data) => setData(data));
  },[]);

  const event = data?.events?.items;

  console.log(data?.events?.items);
  
  return (
    <div>
      <h1>Calendar</h1>
      {
        event?.map((event: any, i: number)=>{
          return (
            <ul key={i}>
              <li>
                <b>{event?.summary}</b>
                <span>{event?.description}</span>
                <span>{event?.hangoutLink}</span>
              </li>
            </ul>
          )
        })
      }
    </div>
  );
}
