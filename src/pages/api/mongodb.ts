import {ObjectId } from "mongodb";

import { GetEventsCollection } from "@/utils/mongo";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;   

    const getCollectionEvent = async() => {
        const collection = await GetEventsCollection();
        return collection;
    };

    const db_events = await getCollectionEvent();
    
    if (req.method === "GET") { 
        
        if (id) {
            if (!id || typeof id !== "string") {
                return res.status(400).json({ message: "Missing or invalid eventId" });
            };

            const result = await db_events.find({ _id: new ObjectId(id) }).toArray();

            return res.json({ data: result});

        } else {

            const result = await db_events.find({}).toArray();

            if (result.length === 0) {
                return res.status(404).json({ message: "No events found" });
            }

            return res.json({ data: result});
        }; 
    };

    if (req.method === "DELETE") {

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Missing or invalid eventId" });
        };

        const result = await db_events.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            return res.status(200).json({ message: "Successfully deleted" });
        } else {
            return res.status(404).json({ message: "Event not found" });
        };
    };

    if (req.method === "PATCH") {

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Missing or invalid eventId" });
        };

        const { approved, date_start, date_end, event_from, event_title } = req.body;

        const result = await db_events.updateOne(
            { _id: new ObjectId(id) },
            { $set: { approved, date_start, date_end, event_from, event_title } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        };
        return res.status(200).json({ message: "Event updated" });
    };

    if (req.method === "POST") {

        const {event_title, event_from, date_start, date_end, approved} = req.body;

        try {
            const result = await db_events.insertOne({event_title, event_from, date_start, date_end, approved});

            return res.status(200).json({ message: "Event added", data: result });
        } catch (error) {
            return res.status(500).json({ message: "Failed to add event", error: error });
        };
    };
};