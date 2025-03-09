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
    googleClient.setCredentials({access_token: token[0].token});

    const {id} = req.query;

    if(req.method === "GET"){
        if(id){
            if (!id || typeof id !== "string") {
                return res.status(400).json({ message: "Missing or invalid eventId" });
            };

            const response = await google.calendar("v3").events.get({
                calendarId: "primary",
                eventId: id,
                auth: googleClient,
            });

            return res.json({ calendar: response.data });

        }else{
            const response = await google.calendar("v3").events.list({
                calendarId: "primary",
                auth: googleClient,
                singleEvents: true,
                eventTypes: ["default"],
            });
    
            return res.json({ calendar: (await response).data });
        };
    };

    if(req.method === "DELETE"){
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Missing or invalid eventId" });
        };

        await google.calendar("v3").events.delete({
            calendarId: "primary",
            eventId: id,
            auth: googleClient,
        });

        return res.status(200).json({ message: "success" });
    };

    if(req.method === "PATCH") {
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Missing or invalid eventId" });
        };

        //this will return the json of description and title and other information
        const event = req.body;

        await google.calendar("v3").events.patch({
            calendarId: "primary",
            eventId: id,
            auth: googleClient,
            requestBody: event,
        });

        return res.status(200).json({ message: "Event updated successfully", changes: event });
    };
};