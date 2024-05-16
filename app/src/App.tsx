import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchTasks, postTask } from "./util";

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
        {tasks.data?.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
            <TaskButton onClick={createTaskMutation.mutate}>
              タスクを作成する
            </TaskButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Task: React.FC<{ task: TaskData }> = ({ task }) => {
  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.createdAt}</p>
      <p>{task.finishedAt}</p>
    </>
  );
};

const TaskButton: React.FC<TaskManagementButtonProps> = (props) => {
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
};
