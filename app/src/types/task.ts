type TaskData = {
  id: string;
  title: string;
  createdAt: string;
  finishedAt: string;
};

type TaskManagementButtonProps = {
  onClick: () => void; // 作成、更新、削除の処理を行う関数
  children: React.ReactNode;
};
