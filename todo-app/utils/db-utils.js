import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export const connectDb = async () => {
  const client = await clientPromise;
  return client;
};

export const addPost = async (client, database, docCollection, bodyObj) => {
  const db = client.db(database);
  const todo = await db.collection(docCollection).insertOne(bodyObj);

  return todo;
};

export const getAllPosts = async (client, database, docCollection) => {
  const db = client.db(database);
  const todoList = await db
    .collection(docCollection)
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return todoList;
};

export const getSinglePost = async (client, database, docCollection, id) => {
  const db = client.db(database);
  const todo = await db.collection(docCollection).findOne({
    _id: new ObjectId(id),
  });

  return todo;
};
