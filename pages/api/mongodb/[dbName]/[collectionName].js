import { getCollection } from "../../../../utils/mongoDbFunctions";

export default async function handler(req, res) {
  const { dbName, collectionName } = req.query;
  const { body } = req;

  const collectionCloud = await getCollection(dbName, collectionName);
  const response = await collectionCloud.insertOne(body);

  res.status(200).json(response);
}
