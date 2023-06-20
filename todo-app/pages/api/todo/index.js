import { addPost, connectDb, getAllPosts } from "../../../utils/db-utils";

async function handler(req, res) {
  let client;

  try {
    client = await connectDb();
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error connecting to mongoDb" });
    return;
  }

  if (req.method === "GET") {
    try {
      const todoList = await getAllPosts(client, "todo", "todo-list");
      res
        .status(201)
        .json({ message: "Success getting the data.", todoList: todoList });
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Unable to get the posts" });
      return;
    }
  }

  if (req.method === "POST") {
    const { todoTitle, todoDescription } = req.body;

    if (
      !todoTitle ||
      todoTitle.trim() === "" ||
      !todoDescription ||
      todoDescription.trim() === ""
    ) {
      res.status(500).json({ message: "Invalid input sent to the request" });
      return;
    }

    const resObj = { todoTitle, todoDescription };

    try {
      //logica para adicionar o todo
      const post = await addPost(client, "todo", "todo-list", resObj);
      res.status(201).json({ message: "Todo added successfull!", todo: post });
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Unable to add the post." });
    }
  }
}

export default handler;
