/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { taskReducers } from "../reducers/taskReducers";
import { initialTasks } from "../data/initialData";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

const TasksProvider = ({ children }) => {
  const initialState = {
    fullData: initialTasks,
    tasks: initialTasks,
  };
  const [state, dispatch] = useReducer(taskReducers, initialState);

  return (
    <TaskContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};

export default TasksProvider;

export const useTasks = () => {
  return useContext(TaskContext);
};

export const useTasksDispatch = () => {
  return useContext(TaskDispatchContext);
};
