import { TASK_DATA } from "./action";
const initState = {
  taskData: [],
};

export const taskReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TASK_DATA:
      return {
        ...state,
        taskData: [...payload],
      };
    default:
      return state;
  }
};
