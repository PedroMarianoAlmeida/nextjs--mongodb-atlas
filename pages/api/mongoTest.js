import getDatabase from "../../utils/mongoDbFunctions";

export default async function handler(req, res) {
  const db = await getDatabase("sample_analytics");

  const response = await db.collection("customers").insertOne({
    name: "Pedro",
    age: "45",
  });

  res.status(200).json(response);
}
