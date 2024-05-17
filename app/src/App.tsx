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
import Title from "./components/Title";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
};

const MainPage: React.FC = () => {
  return (
    <>
      <TaskCreateButton />
      <Title />
      <Suspense fallback={<Loading />}>
        <TaskList />
      </Suspense>
    </>
  );
};

const TaskList = () => {
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  return (
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
  );
};
