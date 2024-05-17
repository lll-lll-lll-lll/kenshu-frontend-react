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

export const updateTask = async (id: string, title: string) => {
  await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
};

export const updateTaskStatus = async (id: string, finishedAt: string) => {
  await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ finishedAt }),
  });
};

export const deleteTask = async (id: string) => {
  await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
