import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "GET") { 
        try {
            const { userId } = getAuth(req);
            
            if (!userId) {
                return res.status(401).json({ error: "Token validation failed, Please check your device's date and time settings and try again" });
            }
            
            return res.status(200).json({ 
                message: 'Success',
            });
            
        } catch (error) {
            // Simple retry for token-not-active-yet error
            try {
                const { userId } = getAuth(req);
                if (!userId) {
                    return res.status(401).json({ error: "unauthorized" });
                }
                
                return res.status(200).json({ message: 'Success' });
                
            } catch (retryError) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
        }
    }

    return res.status(404).json({ error: 'Method not allowed' });
};