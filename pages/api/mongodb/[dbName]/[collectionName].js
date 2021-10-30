import { getCollection } from "../../../../utils/mongoDbFunctions";

export default async function handler(req, res) {
  const { dbName, collectionName } = req.query;
  const { body } = req;

  const { action, data } = body;

  const collectionCloud = await getCollection(dbName, collectionName);

  const actions = {
    insertOne: collectionCloud.insertOne(data),
    insertMany: collectionCloud.insertMany(data),
  };

  const response = await actions[action];

  res.status(200).json(response);
}
