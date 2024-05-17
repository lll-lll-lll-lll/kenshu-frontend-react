import { useTaskMutation } from "../hook/task";
import TaskButton from "./TaskButton";

const TaskDeleteButton = ({ id }: { id: string }) => {
  function onClickDeleteTask() {
    deleteTaskMutation.mutateAsync(id).catch((e) => {
      console.log(e);
    });
  }
  const { deleteTaskMutation } = useTaskMutation();

  return (
    <TaskButton
      type="button"
      onClick={onClickDeleteTask}
      style="bg-red-600 font-medium p-3 rounded-lg text-white"
    >
      削除する
    </TaskButton>
  );
};

export default TaskDeleteButton;
