import style from "./Task.module.css";
import { styled } from "@mui/material/styles";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { NavbarComp } from "../../Components/NavbarComp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StyledTextField = styled(TextField)({
  width: "80%",
  color: "primary",
});

export const Task = () => {
  //--------------getting login state from redux----------------//
  const info = useSelector((state) => state.login);
  const navigate = useNavigate();
  //-----------redirecting to home page not logged in----------------//
  useEffect(() => {
    if (info.token === "") {
      navigate("/login");
    }
  }, [info, navigate]);
  //--------setting task from initial state----------//
  const [taskData, setTaskData] = useState({
    task: "",
    date: "",
    status: "",
    priority: "",
    userId: info.userId,
  });

  const createTask = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8086/task", taskData)
      .then((res) => {
        navigate("/");
        setTaskData({
          task: "",
          date: "",
          status: "",
          priority: "",
          userId: info.userId,
        });
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <NavbarComp></NavbarComp>
      <div id={style.TaskContainer}>
        <div className={style.main}>
          <form className={style.TaskForm} onSubmit={handleSubmit}>
            <label>Add Task</label>

            <StyledTextField
              label="Task"
              color="primary"
              name="task"
              value={taskData.task}
              onChange={createTask}
              focused
            />
            <StyledTextField
              label="End-date"
              color="primary"
              type="date"
              name="date"
              value={taskData.date}
              onChange={createTask}
              focused
            />
            <FormControl sx={{ m: 1, minWidth: "80%" }} focused>
              <InputLabel htmlFor="grouped-select">Status</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Status"
                name="status"
                value={taskData.status}
                onChange={createTask}
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
                value={taskData.priority}
                onChange={createTask}
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
      </div>
    </>
  );
};
