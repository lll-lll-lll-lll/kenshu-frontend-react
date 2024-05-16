export const fetchTasks = async () => {
  const res: { tasks: TaskData[] } = await fetch(
    "http://localhost:8000/api/tasks",
    { method: "GET" }
  ).then((r) => r.json());
  return res;
};

export const postTask = async () => {
  await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
