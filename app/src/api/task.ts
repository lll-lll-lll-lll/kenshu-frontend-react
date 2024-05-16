export const fetchTasks = async () => {
  const res: { tasks: TaskData[] } = await fetch(
    "http://localhost:8000/api/tasks",
    { method: "GET", headers: { "Content-Type": " application/json" } }
  ).then((r) => r.json());
  return res;
};

export const createTask = async () => {
  await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
