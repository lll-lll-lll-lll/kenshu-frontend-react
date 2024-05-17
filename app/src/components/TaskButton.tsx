type TaskManagementButtonProps = {
  style?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void; // 作成、更新、削除の処理を行う関数
  children: React.ReactNode;
};

const TaskButton: React.FC<TaskManagementButtonProps> = (props) => {
  const defaultStyle = "bg-green-600 font-medium p-3 rounded-lg text-white";
  const style = props.style ? props.style : defaultStyle;
  return (
    <button className={style} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default TaskButton;
