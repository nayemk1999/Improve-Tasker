/* eslint-disable react/prop-types */
import { useState } from "react";
import { toastError, toastSuccess } from "../utils/Toasty";
import { useTasks, useTasksDispatch } from "../contexts/TasksContext";
import { getNextId } from "../utils/getNextId";
import { validateForm } from "../utils/validFormFields";

const TaskModal = ({ onClose, taskUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    priority: "",
    isFavorite: false,
    ...taskUpdate,
  });
  const dispatch = useTasksDispatch();
  const { tasks } = useTasks();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm(formData);

    if (isValid.length > 0) {
      toastError(`${isValid.join(", ")} is required fields`);
      return;
    } else {
      const id = formData.id || getNextId(tasks);
      dispatch({
        type: taskUpdate ? "EDIT_TASK" : "ADD_TASK",
        payload: { ...formData, id: id },
      });
      onClose(false);
      toastSuccess(`Successfully ${taskUpdate ? "edit" : "add"} this task.`);
      // onSaveTask(formData, taskUpdate);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
    >
      <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {taskUpdate ? "Edit This Task" : "Add New Task"}
      </h2>
      {/* inputs */}
      <div className="space-y-9 text-white lg:space-y-10">
        {/* title */}
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            type="text"
            name="title"
            id="title"
            required=""
            onChange={handleOnChange}
            value={formData.title}
          />
        </div>
        {/* description */}
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            type="text"
            name="description"
            id="description"
            required=""
            value={formData.description}
            onChange={handleOnChange}
          />
        </div>
        {/* input group */}
        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
          {/* tags */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="tags"
              required=""
              onChange={handleOnChange}
              value={formData.tags}
            />
          </div>
          {/* priority */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              name="priority"
              required=""
              onChange={handleOnChange}
              defaultValue={formData.priority}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
      {/* inputs ends */}
      <div className="mt-16 flex justify-between lg:mt-20">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
        >
          {taskUpdate ? "Update Task" : "Create new Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskModal;
