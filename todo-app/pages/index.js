import Head from "next/head";
import { getAllPosts, connectDb } from "../utils/db-utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import TodoItem from "../components/TodoItem";

export default function Home({ todoList }) {
  const [updatedTodoList, setUpdatedTodoList] = useState(todoList);
  const [deleteUpdate, setDeleteUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/todo");
      const data = await response.json();

      setUpdatedTodoList(data.todoList);
    };
    fetchData();
  }, [deleteUpdate]);

  if (!todoList || !updatedTodoList) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="Create a simple and useful Todo List"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>Todo List</h1>
        {todoList.length === 0 && (
          <div className="no-content">
            <h3>Nothing to do yet...</h3>

            <Link href="/add-todo" className="homepage-link">
              Add something
            </Link>
          </div>
        )}

        {updatedTodoList.map((item) => (
          <TodoItem
            deleteUpdate={deleteUpdate}
            setDeleteUpdate={setDeleteUpdate}
            todoTitle={item.todoTitle}
            todoDescription={item.todoDescription}
            key={item._id}
            id={item._id}
          />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await connectDb();

    const todoList = await getAllPosts(client, "todo", "todo-list");

    return {
      props: { todoList: JSON.parse(JSON.stringify(todoList)) },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
