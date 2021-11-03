import { getCollection } from "../../../../utils/mongoDbFunctions";

export default async function handler(req, res) {
  const { dbName, collectionName } = req.query;
  const { body } = req;

  const { action, data } = body;
  console.log(!action);
  const collectionCloud = await getCollection(dbName, collectionName);

  let response;

  if (!action) {
    // response = await collectionCloud.find({});
    // console.log(response);
    // res.status(200).json(response);
  } else {
    const actions = {
      insertOne: collectionCloud.insertOne(data),
      insertMany: collectionCloud.insertMany(data),
    };

    response = await actions[action];

    res.status(200).json(response);
  }
}
