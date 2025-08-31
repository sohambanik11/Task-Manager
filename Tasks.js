import { useEffect, useState } from "react";
import API from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const { data } = await API.get("/tasks");
    setTasks(data);
  }

  async function addTask() {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  }

  async function toggleTask(id, completed) {
    await API.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  }

  async function deleteTask(id) {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  }

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span style={{ textDecoration: t.completed ? "line-through" : "" }}>
              {t.title}
            </span>
            <button onClick={() => toggleTask(t._id, t.completed)}>Toggle</button>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}