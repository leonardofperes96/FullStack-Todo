import styles from "./TodoItem.module.css";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaTrashAlt, FaRegEdit } from "react-icons/fa";

const TodoItem = ({
  todoTitle,
  todoDescription,
  id,
  deleteUpdate,
  setDeleteUpdate,
}) => {
  const [done, setDone] = useState(false);
  const handleDelete = async (id) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    setDeleteUpdate(!deleteUpdate);
  };

  return (
    <div
      className={
        !done
          ? styles.todo_container
          : `${styles.todo_container} ${styles.done}`
      }
    >
      <h3>{todoTitle}</h3>
      <div className={styles.todo_info}>
        <p className={styles.todo_desc}>{todoDescription}</p>
      </div>
      <div className={styles.todo_options}>
        {!done && (
          <button onClick={handleDelete.bind(null, id)}>
            <FaTrashAlt className={styles.todo_option} />
          </button>
        )}
        {!done && (
          <Link className={styles.link} href={`/edit-todo/${id}`}>
            <FaRegEdit className={styles.todo_option} />
          </Link>
        )}
        <button onClick={() => setDone(!done)}>
          <FaCheck className={styles.todo_option} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
