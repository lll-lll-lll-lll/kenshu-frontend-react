import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchTasks } from "./api/task";
import Task from "./components/Task";
import TaskCreateButton from "./components/TaskCreateButton";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
};

const MainPage: React.FC = () => {
  const tasks = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  return (
    <div>
      <TaskCreateButton />
      <h1>Todo List</h1>
      <ul className="flex-row">
        {tasks.isLoading && <p>ロード中です</p>}
        {tasks.isError && <p>再度リロードしてください</p>}

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
