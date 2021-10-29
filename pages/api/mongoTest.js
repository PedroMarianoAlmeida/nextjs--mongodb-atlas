import connect from "../../utils/database";

export default async function handler(req, res) {
  const { db } = await connect();

  const response = await db.collection("listingsAndReviews").insertOne({
    name: "Pedro",
    age: "45",
  });

  res.status(200).json(response);
}
