import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchTasks, postTask } from "./api/task";
import TaskButton from "./components/TaskButton";
import Task from "./components/Task";

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
  const createTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return (
    <div>
      <ul>
        {tasks.isLoading && <p>ロード中です</p>}
        {tasks.isError && <p>再度リロードしてください</p>}
        {tasks.data?.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
        <TaskButton onClick={createTaskMutation.mutate} type="button">
          タスクを作成する
        </TaskButton>
      </ul>
    </div>
  );
};
