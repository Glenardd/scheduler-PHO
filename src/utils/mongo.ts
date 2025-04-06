import { Collection, MongoClient } from 'mongodb';

// Global variables to maintain connection state
let client: MongoClient | null = null;
let eventsCollection: Collection | null = null;

export async function getEventsCollection(): Promise<Collection> {
  // If we already have a collection, return it
  if (eventsCollection) {
    return eventsCollection;
  };
  
  // Check for MongoDB URI
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  };
  
  const uri = process.env.MONGODB_URI;
  const dbName = 'pho_db';
  const collectionNameEvents = "events";
  
  try {
    // Create a new client if we don't have one
    if (!client) {
      client = new MongoClient(uri, {
        maxPoolSize: 10,
        minPoolSize: 5,
        maxIdleTimeMS: 30000
      });
      
      // Connect to the client
      await client.connect();
    };
    
    // Get the collection
    const db = client.db(dbName);
    eventsCollection = db.collection(collectionNameEvents);
    
    return eventsCollection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  };
};