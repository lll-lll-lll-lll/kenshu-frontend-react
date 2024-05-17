type TaskManagementButtonProps = {
  type: "button" | "submit" | "reset";
  onClick?: () => void; // 作成、更新、削除の処理を行う関数
  children: React.ReactNode;
};

const TaskButton: React.FC<TaskManagementButtonProps> = (props) => {
  return (
    <button
      className="bg-blue-600 font-medium p-3 rounded-sm text-white"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default TaskButton;
