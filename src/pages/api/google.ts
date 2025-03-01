import googleClient from "@/utils/googleapi";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { google } from 'googleapis';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    //userid
    const userID = await getAuth(req).userId;

    //check if userId is not found
    if (!userID) {
        return res.status(400).json({ message: "User ID not found" });
    };

    //get the token of the userid using the google provider auth
    const token = (await (await clerkClient()).users.getUserOauthAccessToken(userID, "google")).data

    //set the cridentials 
    googleClient.setCredentials({access_token: token[0].token})

    if(req.method === "GET"){
        const events = await google.calendar("v3").events.list({
            calendarId: "primary",
            auth: googleClient,
            singleEvents: true,
            eventTypes: ["default"],
        });

        return res.json({ calendar: (await events).data });
    };

    if(req.method === "DELETE"){
        const { eventId } = req.query;

        if (!eventId || typeof eventId !== "string") {
            return res.status(400).json({ message: "Missing or invalid eventId" });
        };

        await google.calendar("v3").events.delete({
            calendarId: "primary",
            eventId,
            auth: googleClient,
        });
    };
};