const Task: React.FC<{ task: TaskData }> = ({ task }) => {
  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.createdAt}</p>
      <p>{task.finishedAt}</p>
    </>
  );
};
export default Task;
