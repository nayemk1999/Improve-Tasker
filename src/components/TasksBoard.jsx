import { useState } from "react";
import TaskModal from "./TaskModal";
import TasksTable from "./TasksTable";
import SearchBox from "./SearchBox";
import NoTasksFound from "./NoTasksFound";

import { toastSuccess } from "../utils/Toasty";
import { useTasks, useTasksDispatch } from "../contexts/TasksContext";

const TasksBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);
  const { tasks, fullData } = useTasks();
  const dispatch = useTasksDispatch();

  const handleEditTask = (task) => {
    setTaskUpdate(task);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTaskUpdate(null);
  };

  const handleDeleteAll = () => {
    if (tasks.length < 1) {
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      dispatch({
        type: "DELETE_ALL_TASKS",
        payload: [],
      });
      toastSuccess("Successfully deleted all tasks.");
    }
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <SearchBox />

              <button
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                onClick={() => setShowModal(true)}
              >
                Add Task
              </button>
              <button
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>

          {tasks.length > 0 ? (
            <TasksTable tasks={tasks} onUpdateTask={handleEditTask} />
          ) : (
            <NoTasksFound
              message={
                fullData.length < 1 ? "Tasks List Is Empty" : "No Tasks Found"
              }
            />
          )}
        </div>
      </div>

      {showModal ? (
        <>
          <div className="bg-black bg-opacity-70 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <TaskModal onClose={handleClose} taskUpdate={taskUpdate} />
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default TasksBoard;
