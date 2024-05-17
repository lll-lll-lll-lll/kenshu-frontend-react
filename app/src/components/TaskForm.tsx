import { useState } from "react";
import TaskButton from "./TaskButton";
import { useTaskMutation } from "../hook/task";

export const TaskForm: React.FC<{ task: TaskData }> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { updateTaskMutation } = useTaskMutation();
  const onClickSubmit = (e) => {
    e.preventDefault();
    updateTaskMutation.mutate({ id: task.id, title: title });
    setIsEditing(!isEditing);
  };

  return (
    <form
      onSubmit={(e) => {
        onClickSubmit(e);
      }}
    >
      {isEditing ? (
        <input
          id={task.id}
          name={"task"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        title
      )}
      {isEditing ? <TaskButton type="submit">保存</TaskButton> : <></>}
      {!isEditing ? (
        <TaskButton
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          編集
        </TaskButton>
      ) : (
        <></>
      )}
    </form>
  );
};
