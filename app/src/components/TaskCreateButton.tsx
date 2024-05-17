import { useTaskMutation } from "../hook/task";
import TaskButton from "./TaskButton";

const TaskCreateButton = () => {
  const { createTaskMutation } = useTaskMutation();

  return (
    <TaskButton
      onClick={createTaskMutation.mutate}
      type="button"
      style="bg-orange-600 font-medium p-3 rounded-lg text-white"
    >
      タスクを作成する
    </TaskButton>
  );
};

export default TaskCreateButton;
