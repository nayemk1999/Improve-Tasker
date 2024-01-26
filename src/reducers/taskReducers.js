/* eslint-disable no-case-declarations */
export const taskReducers = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newData = [...state.fullData, action.payload];
      return { fullData: newData, tasks: newData };
    case "EDIT_TASK":
      const updateData = state.fullData.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
      return { fullData: updateData, tasks: updateData };
    case "DELETE_TASK":
      const updateAfterDelete = state.fullData.filter(
        (task) => task.id !== action.payload.id
      );
      return { fullData: updateAfterDelete, tasks: updateAfterDelete };
    case "DELETE_ALL_TASKS":
      return { fullData: action.payload, tasks: action.payload };
    case "SEARCH_ALL_TASKS":
      const tasks = state.fullData.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { tasks, fullData: state.fullData };
    default:
      return state;
  }
};
