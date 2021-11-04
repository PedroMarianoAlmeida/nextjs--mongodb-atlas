//-------CONNECTION------------------------------------------
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const client = new MongoClient(uri, options);

const connect = async () => {
  if (!client.isConnected) await client.connect();
  return client;
};

export async function getDatabase(dbName) {
  const client = await connect();
  const db = client.db(dbName);
  return db;
}

export async function getCollection(dbName, collectionName) {
  const dbCloud = await getDatabase(dbName);
  const collection = dbCloud.collection(collectionName);
  return collection;
}
//------------------------------------------------------------
const requestValidation = (mongo) => {
  const { db, collection, action, data } = mongo;
  if (!db) return { ok: false, message: "missing database name" };
  if (!collection) return { ok: false, message: "missing collection name" };
  if (!action) return { ok: false, message: "missing action" };
  if (!data) return { ok: false, message: "missing data object" };
  return { ok: true, message: "" };
};

export default async function handler(req, res) {
  const { mongo } = req.body;
  const { db, collection, action, data } = mongo;

  const validation = requestValidation(mongo);

  if (!validation.ok) res.status(400).json({ message: validation.message });

  const collectionCloud = await getCollection(db, collection);

  let response;

  switch (action) {
    case "insertOne":
      response = await collectionCloud.insertOne(data);
      break;

    case "insertMany":
      response = await collectionCloud.insertMany(data);
      break;
  }

  res.status(200).json(response);
}
