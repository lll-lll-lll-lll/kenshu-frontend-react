import TaskButton from "./TaskButton";
import { useTaskMutation } from "../hook/task";

interface Props {
  task: TaskData;
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDoneButton: React.FC<Props> = ({ task, isDone, setIsDone }) => {
  const { updateTaskStatusMutation } = useTaskMutation();

  function onClickDoneTask() {
    updateTaskStatusMutation
      .mutateAsync({
        id: task.id,
        finishedAt: new Date().toISOString(),
      })
      .then(() => {
        setIsDone(!isDone);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      {!isDone ? (
        <TaskButton type="button" onClick={onClickDoneTask}>
          完了
        </TaskButton>
      ) : (
        <>
          <p>{task.finishedAt}</p>
          <TaskButton
            type="button"
            onClick={() => {
              setIsDone(!isDone);
            }}
            style="bg-gray-600 font-medium p-3 rounded-lg text-white"
          >
            タスクを元に戻す
          </TaskButton>
        </>
      )}
    </>
  );
};
export default TaskDoneButton;
