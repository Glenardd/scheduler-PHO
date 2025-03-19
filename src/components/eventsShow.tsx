"use client";

import useSWR, { useSWRConfig } from "swr";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function eventsShow() {

    const { data } = useSWR("/api/mongodb", (url) => fetch(url, { method: "GET" }).then((res) => res.json()))

    const { mutate } = useSWRConfig();

    const events = data?.data;

    console.log(events);

    // date format
const dateFormat = (time: any) => {
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(timeShort);
    return shortTime;
};

    return (
        <div className="flex justify-center gap-4 m-4">
            <div className="w-[50%] rounded-md border">
                <div className="m-4 text-lg font-bold">DOH</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Health Celebrations</TableHead>
                            <TableHead>DAY/DATE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            events?.map((event: any) => {
                                if(event.event_from !== 'DOH' || event.approved !== 'true'){
                                    return null;
                                };

                                return (
                                    <TableRow key={event._id}>
                                        <TableCell>{event.event_title}</TableCell>
                                        <TableCell>{dateFormat(event.date_start)} - {dateFormat(event.date_end)} </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="w-[50%] rounded-md border">
                <div className="m-4 text-lg font-bold">PHO</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Health Celebrations</TableHead>
                            <TableHead>DAY/DATE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            events?.map((event: any) => {
                                if(event.event_from !== 'PHO' || event.approved !== 'true'){
                                    return null;
                                };

                                return (
                                    <TableRow key={event._id}>
                                        <TableCell>{event.event_title}</TableCell>
                                        <TableCell>{dateFormat(event.date_start)} - {dateFormat(event.date_end)} </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
