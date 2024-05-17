import { useState } from "react";
import TaskButton from "./TaskButton";
import { useTaskMutation } from "../hook/task";

export const TaskForm: React.FC<{ task: TaskData }> = ({ task }) => {
  const [isDone, setIsDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { updateTaskMutation, updateTaskStatusMutation } = useTaskMutation();
  function onClickSubmit(e) {
    e.preventDefault();
    updateTaskMutation
      .mutateAsync({ id: task.id, title: title })
      .then(() => {
        setIsEditing(!isEditing);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
    <div className="flex space-x-3">
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
          <>{title}</>
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
          >
            タスクを元に戻す
          </TaskButton>
        </>
      )}
    </div>
  );
};
