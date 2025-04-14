import { Collection, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'pho_db';
const collectionName = "events";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global is used in development to prevent multiple instances
let cached: {
  client: MongoClient | null;
  collection: Collection | null;
} = (global as any)._mongoCache || {
  client: null,
  collection: null,
};
(global as any)._mongoCache = cached;

if (!cached) {
  cached = {
    client: null,
    collection: null,
  };
  (global as any)._mongoCache = cached;
}

export async function getEventsCollection(): Promise<Collection> {
  if (cached.collection) {
    return cached.collection;
  }

  if (!cached.client) {
    cached.client = new MongoClient(uri!, {
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000
    });
    await cached.client.connect();
  }

  const db = cached.client.db(dbName);
  cached.collection = db.collection(collectionName);
  return cached.collection;
}
