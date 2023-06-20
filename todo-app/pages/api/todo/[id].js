import { connectDb, getSinglePost } from "../../../utils/db-utils";
import { ObjectId } from "mongodb";
async function handler(req, res) {
  let client;
  const id = req.query.id;
  try {
    client = await connectDb();
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Error connecting to mongoDb" });
    return;
  }

  if (req.method === "PUT") {
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

    try {
      const db = client.db("todo");
      const updatedTodo = await db.collection("todo-list").updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            todoTitle: todoTitle,
            todoDescription: todoDescription,
          },
        }
      );
      res.status(500).json({
        message: `The todo was updated sucessfull!`,
        updatedTodo: updatedTodo,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || "Updating todo failed." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const db = client.db("todo");
      const deleteTodo = await db.collection("todo-list").deleteOne({
        _id: new ObjectId(id),
      });
      res.status(201).json({ message: "Todo sucessfully removed." });
    } catch (err) {
      res.status(500).json({ message: err.message || "Failed to delete todo" });
    }
  }

  if (req.method === "GET") {
    try {
      const todo = getSinglePost(client, "todo", "todo-list", id);

      res
        .status(201)
        .json({ message: `Todo${id} sucessfully readed.`, todo: todo });
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Failed to get the todo." });
    }
  }
}

export default handler;
