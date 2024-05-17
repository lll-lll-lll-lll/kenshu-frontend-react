import { useState } from "react";
import { useTaskMutation } from "../hook/task";
import TaskDoneButton from "./TaskDoneButton";
import TaskEditButton from "./TaskEditButton";
import TaskDeleteButton from "./TaskDelete";

export const TaskForm: React.FC<{ task: TaskData }> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { updateTaskMutation } = useTaskMutation();
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

  return (
    <div className="flex space-x-3">
      <form
        onSubmit={(e) => {
          onClickSubmit(e);
        }}
      >
        {!isDone ? (
          <TaskEditButton
            task={task}
            taskTitle={title}
            setIsEditing={setIsEditing}
            setTitle={setTitle}
            isEditing={isEditing}
          />
        ) : (
          <></>
        )}
      </form>
      {!isEditing ? (
        <TaskDoneButton isDone={isDone} setIsDone={setIsDone} task={task} />
      ) : (
        <></>
      )}
      <TaskDeleteButton id={task.id} />
    </div>
  );
};
