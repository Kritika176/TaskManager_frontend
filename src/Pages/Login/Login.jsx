import style from "./login.module.css";
import axios from "axios";
import TextFeild from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFail } from "../../Redux/Login";
import { Link } from "react-router-dom";
const StyledTextFeild = styled(TextFeild)({
  width: "80%",
  border: "none",
});

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  //----------storing the form input from user------------
  const createUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://enigmatic-refuge-83934.herokuapp.com/login", user)
      .then((res) => {
        if (!res.data.token) {
          dispatch(loginFail());
          setError(res.data.msg);
        } else {
          dispatch(
            loginSuccess({ token: res.data.token, userId: res.data.id })
          );
          setUser({
            email: "",
            password: "",
          });
          navigate("/");
        }
      })

      .catch((err) => console.log(err.message));
  };
  return (
    <div id={style.loginContainer}>
      <div className={style.main}>
        <form className={style.loginForm} onSubmit={handleSubmit}>
          <label>LOGIN</label>

          <StyledTextFeild
            id={style.loginEmail}
            name="email"
            value={user.email}
            className={style.text}
            label="Email"
            type="email"
            onChange={createUser}
            onClick={() => setError("")}
          />

          <StyledTextFeild
            id={style.loginPassword}
            name="password"
            value={user.password}
            className={style.text}
            label="Password"
            type="password"
            onChange={createUser}
            onClick={() => setError("")}
          />
          {error !== "" && <span className={style.error}>{`*${error}`}</span>}
          <button type="submit" className={style.submit}>
            Login
          </button>
          <Link to={"/signup"}>
            <p className={style.link}>Don't have an account?Sign Up</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
