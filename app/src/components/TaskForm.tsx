import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateTask } from "../api/task";
import TaskButton from "./TaskButton";

export const TaskForm: React.FC<{ task: TaskData }> = ({ task }) => {
  const queryClient = useQueryClient();
  const onClickSubmit = (e) => {
    e.preventDefault();
    updateTaskMutation.mutate({ id: task.id, title: task.title });
  };
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const updateTaskMutation = useMutation({
    mutationFn: (formData: { id: string; title: string }) =>
      updateTask(formData.id, formData.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

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
      {isEditing ? (
        <TaskButton
          type="submit"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          保存
        </TaskButton>
      ) : (
        <TaskButton
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          編集
        </TaskButton>
      )}
    </form>
  );
};
