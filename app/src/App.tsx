import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchTasks, createTask } from "./api/task";
import TaskButton from "./components/TaskButton";
import Task from "./components/Task";
import { useTaskMutation } from "./hook/task";

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
  const { createTaskMutation } = useTaskMutation();

  return (
    <ul className="flex-row">
      {tasks.isLoading && <p>ロード中です</p>}
      {tasks.isError && <p>再度リロードしてください</p>}
      {tasks.data?.tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
      <TaskButton
        onClick={createTaskMutation.mutate}
        type="button"
        style="bg-red-600 font-medium p-3 rounded-lg text-white"
      >
        タスクを作成する
      </TaskButton>
    </ul>
  );
};
