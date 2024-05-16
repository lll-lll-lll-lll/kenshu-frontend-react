import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateTask } from "../api/task";
import { useForm } from "@tanstack/react-form";
import TaskButton from "./TaskButton";

export const TaskForm: React.FC<{ task: TaskData }> = ({ task }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    onSubmit: async ({ value }: { value: { title: string } }) => {
      setTitle(value.title);
      updateTaskMutation.mutate({ id: task.id, title });
    },
  });
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
        // 保存ボタン実行時にフォームのsubmitを実行する
        if (!isEditing) {
          e.preventDefault();
          form.handleSubmit();
        }
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div>
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => (!value ? title : ""),
          }}
          children={(field) => {
            return (
              <>
                {isEditing ? (
                  <input
                    id={task.id}
                    name={field.name}
                    value={field.state.value || title}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  title
                )}
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit]}
        children={() => (
          <TaskButton
            type="submit"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "保存" : "編集"}
          </TaskButton>
        )}
      />
    </form>
  );
};
