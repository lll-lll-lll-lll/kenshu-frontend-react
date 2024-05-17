import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask, updateTaskStatus } from "../api/task";

export const useTaskMutation = () => {
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (formData: { id: string; title: string }) =>
      updateTask(formData.id, formData.title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: (formData: { id: string; finishedAt: string }) =>
      updateTaskStatus(formData.id, formData.finishedAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { createTaskMutation, updateTaskMutation, updateTaskStatusMutation };
};
