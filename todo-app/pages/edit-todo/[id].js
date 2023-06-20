import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import styles from "../../styles/add-todo.module.css";
import { useRouter } from "next/router";
import { getSinglePost, connectDb } from "../../utils/db-utils";
import Head from 'next/head'

function EditPage({ todo }) {
  const id = todo._id;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [todoTitle, setTodoTitle] = useState(todo.todoTitle);
  const [todoDescription, setTodoDescription] = useState(todo.todoDescription);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !todoTitle ||
      todoTitle.trim() === "" ||
      !todoDescription ||
      todoDescription.trim() === ""
    ) {
      setError("Invalid input.");
      setLoading(false);
      return;
    }

    const todoObj = {
      todoTitle,
      todoDescription,
    };

    const response = await fetch(`/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setTodoTitle("");
    setTodoDescription("");
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{todo.todoTitle}</title>
        <meta
          name="description"
          content={`Todo item ${todo.todoTitle} ${todo.todoDescription}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.post_container}>
        <h1>Edit now</h1>
        <form onSubmit={handleSubmit}>
          <FormComponent
            name="Todo Title"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <FormComponent
            name="Todo Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className={styles.submit_btn} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  try {
    const client = await connectDb();

    const todo = await getSinglePost(client, "todo", "todo-list", id);

    return {
      props: { todo: JSON.parse(JSON.stringify(todo)) },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default EditPage;
