import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchTasks } from "./api/task";
import Task from "./components/Task";
import TaskCreateButton from "./components/TaskCreateButton";
import { Suspense } from "react";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    </QueryClientProvider>
  );
};

const MainPage: React.FC = () => {
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    suspense: true,
  });

  return (
    <div>
      <TaskCreateButton />
      <h1>Todo List</h1>
      <ul className="flex-row">
        {tasks.data?.tasks
          .slice()
          .reverse()
          .map((task) => (
            <li key={task.id}>
              <Task task={task} />
            </li>
          ))}
      </ul>
    </div>
  );
};
