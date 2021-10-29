import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const client = new MongoClient(uri, options);

const connect = async () => {
  if (!client.isConnected) await client.connect();
  return client;
};

export default async function getDatabase(dbName) {
  const client = await connect();
  const db = client.db(dbName);
  return db;
}
