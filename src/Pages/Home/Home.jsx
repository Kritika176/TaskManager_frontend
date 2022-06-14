import style from "./Home.module.css";
import { NavbarComp } from "../../Components/NavbarComp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskFunction } from "../../Redux/Task/action";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
const StyledTextField = styled(TextField)({
  width: "80%",
  color: "primary",
});
export function Home() {
  const info = useSelector((state) => state.login);
  const taskData = useSelector((state) => state.task.taskData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState({
    task: "",
    date: "",
    status: "",
    priority: "",
    userId: info.userId,
  });

  //-----------dispatch action for fetching data using redux action------------------//
  useEffect(() => {
    dispatch(taskFunction(info.userId));
  }, [dispatch, info.userId]);
  //------------------redirecting to home page not logged in----------------//
  useEffect(() => {
    if (info.token === "") {
      navigate("/login");
    }
  }, [info, navigate]);
  const patchFun = (task, date, status, priority, _id) => {
    //--------setting task_id to use in patch req-----------//
    setTaskId(_id);
    //----------setting form data with previously filled data-----------//
    setFormData({
      task: task,
      date: date,
      status: status,
      priority: priority,
      userId: info.userId,
    });
    setShow(true);
  };

  const deleteFun = (_id) => {
    axios
      .delete(`http://localhost:8086/task/${_id}`)
      .then((res) => dispatch(taskFunction(info.userId)))
      .catch((err) => console.log(err.message));
  };
  //------------handling form data for patching----------------//
  const createFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // -----------sending patch req-------------//
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8086/task/${taskId}`, formData)
      .then((res) => {
        dispatch(taskFunction(info.userId));
        setShow(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <NavbarComp></NavbarComp>
      <div className={style.taskContainer}>
        <div className={style.taskHeader}>
          <h3 className={style.taskHeading}>Task</h3>
          <h3 className={style.taskHeading}>End-Date</h3>
          <h3 className={style.taskHeading}>Status</h3>
          <h3 className={style.taskHeading}>Priority</h3>
          <h3 className={style.head}>Edit</h3>
          <h3 className={style.head}>Delete</h3>
        </div>
        <div className={style.task}>
          {taskData.map((elem, index) => (
            <div
              key={elem._id}
              className={style.taskCard}
              ind={index}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              <p className={style.taskCardWidth}>{elem.task}</p>
              <p className={style.taskCardWidth}>{elem.date}</p>
              <p className={style.taskCardWidth}>{elem.status}</p>
              <p className={style.taskCardWidth}>{elem.priority}</p>
              <div className={style.icon}>
                <span
                  class="material-symbols-outlined"
                  onClick={() =>
                    patchFun(
                      elem.task,
                      elem.date,
                      elem.status,
                      elem.priority,
                      elem._id
                    )
                  }
                >
                  border_color
                </span>
              </div>
              <div className={style.icon}>
                <span
                  class="material-symbols-outlined"
                  onClick={() => deleteFun(elem._id)}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*--------- showing form conditionally---------- */}
      {show ? (
        <div className={style.main}>
          <form className={style.TaskForm} onSubmit={handleSubmit}>
            <div className={style.cross} onClick={() => setShow(false)}>
              X
            </div>
            <label>Add Task</label>

            <StyledTextField
              label="Task"
              color="primary"
              placeholder="Enter Task"
              name="task"
              value={formData.task}
              onChange={createFormData}
              focused
            />
            <StyledTextField
              label="End-date"
              color="primary"
              type="date"
              name="date"
              value={formData.date}
              onChange={createFormData}
              focused
            />
            <FormControl sx={{ m: 1, minWidth: "80%" }} focused>
              <InputLabel htmlFor="grouped-select">Status</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Status"
                name="status"
                value={formData.status}
                onChange={createFormData}
              >
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Not Started"}>Not Started</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: "80%" }} focused>
              <InputLabel htmlFor="grouped-select">Priority</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={createFormData}
              >
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
            <button type="submit" className={style.submit}>
              Add
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
