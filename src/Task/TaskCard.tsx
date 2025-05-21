type Task = {
  id: number;
  text: string;
  createdAt: string;
};

interface CardProps {
  lastTask: Task;
  deleteTask: (id: number) => void;
}

function Card({ lastTask, deleteTask }: CardProps) {
  return (
    <div
      key={lastTask.id}
      className="w-11/12 bg-white shadow-md rounded-lg p-4 m-4 flex flex-col  "
    >
      {lastTask.text}
      <div className="flex justify-between items-center border-t-2 border-gray-100 mt-4 pt-2">
        <span className="text-gray-300">{lastTask.createdAt}</span>
        <button
          onClick={() => deleteTask(lastTask.id)}
          className="w-[100px] text-white bg-violet-400 p-2 rounded-xl hover:bg-violet-600 cursor-pointer shadow-md self-end"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Card;
