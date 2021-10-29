import getDatabase from "../../../../utils/mongoDbFunctions";

export default async function handler(req, res) {
  const { dbName } = req.query;
  const { body } = req;
  console.log(dbName, body);
  const dbCloud = await getDatabase(dbName);
  const response = await dbCloud.collection("account").insertOne(body);

  res.status(200).json(response);
}
