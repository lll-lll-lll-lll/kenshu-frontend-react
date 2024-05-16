import { TaskForm } from "./TaskForm";

const Task: React.FC<{ task: TaskData }> = ({ task }) => {
  return (
    <>
      <TaskForm task={task} />
      <p>{task.createdAt}</p>
      <p>{task.finishedAt}</p>
    </>
  );
};
export default Task;
