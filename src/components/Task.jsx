import { useTasksDispatch } from "../contexts/TasksContext";
import { toastSuccess } from "../utils/Toasty";
import { getRandomColor } from "../utils/genarateColor";

/* eslint-disable react/prop-types */
const Task = ({ task, onUpdateTask }) => {
  const dispatch = useTasksDispatch();
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch({
        type: "DELETE_TASK",
        payload: task,
      });
      toastSuccess("Successfully deleted a task.");
    }
  };

  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td
        onClick={() => {
          dispatch({
            type: "EDIT_TASK",
            payload: { ...task, isFavorite: !task.isFavorite },
          });
        }}
        className=" cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-star"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke={task.isFavorite ? "yellow" : "currentColor"}
          fill={task.isFavorite ? "yellow" : "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
      </td>
      <td>{task.title}</td>
      <td>
        <div>{task.description}</div>
      </td>
      <td>
        <ul className="flex justify-center gap-1.5 flex-wrap">
          {task.tags.split("," || " ").map((tag, i) => (
            <li key={i}>
              <span
                style={{ backgroundColor: getRandomColor() }}
                className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]`}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="text-center capitalize">{task.priority}</td>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <button className="text-red-500" onClick={handleDelete}>
            Delete
          </button>
          <button className="text-blue-500" onClick={() => onUpdateTask(task)}>
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
