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
    }

    //get the token of the userid using the google provider auth
    const token = (await (await clerkClient()).users.getUserOauthAccessToken(userID, "google")).data

    //set the cridentials 
    googleClient.setCredentials({access_token: token[0].token})

    //place the auth in the calendar
    const events = google.calendar("v3").events.list({
        calendarId: "primary",
        eventTypes: ["default"],
        auth: googleClient,
        singleEvents: true,
    });

    return res.json({ events: (await events).data });
};