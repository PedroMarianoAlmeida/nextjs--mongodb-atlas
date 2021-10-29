import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const client = new MongoClient(uri, options);

export default async function connect() {
  await client.connect();

  const db = client.db("sample_airbnb");
  console.log("db", db);
  return { db, client };
}
