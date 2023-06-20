import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import styles from "../../styles/add-todo.module.css";
import {useRouter} from 'next/router'
import Head from "next/head";

function AddTodoPage() {
  const [error, setError] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [todoDescription, setTodoDescription] = useState("");

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

    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todoObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(response, data);

    setTodoTitle("");
    setTodoDescription("");
    setLoading(false);
    router.push('/')
  };

  return (
    <div className={styles.post_container}>
      <Head>
      <title>Add Todo</title>
        <meta
          name="description"
          content={`Post your todo now!`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Post now</h1>
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
        {error && <p className='error'>{error}</p>}
        <button disabled={loading} className={styles.submit_btn}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddTodoPage;
