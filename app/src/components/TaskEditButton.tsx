import TaskButton from "./TaskButton";

interface Props {
  taskTitle: string;
  task: TaskData;
  isEditing: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskEditButton: React.FC<Props> = ({
  taskTitle,
  task,
  isEditing,
  setTitle,
  setIsEditing,
}) => {
  return (
    <>
      {isEditing ? (
        <input
          id={task.id}
          name={"task"}
          value={taskTitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        <>{taskTitle}</>
      )}
      {isEditing ? <TaskButton type="submit">保存</TaskButton> : <></>}
      {!isEditing ? (
        <TaskButton
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          style="bg-blue-600 font-medium p-3 rounded-lg text-white"
        >
          編集
        </TaskButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskEditButton;
