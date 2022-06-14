import axios from "axios";
export const TASK_DATA = "TASK_DATA";

export const taskSubmissionData = (payload) => ({
  type: TASK_DATA,
  payload,
});

//----------function for fetching data from server and dispatching above action----------
export const taskFunction = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:8086/task?userId=${id}`).then((res) => {
      console.log("resData", res.data);
      return dispatch(taskSubmissionData(res.data));
    });
  };
};
