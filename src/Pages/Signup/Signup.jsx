import style from "./Signup.module.css";
import axios from "axios";
import TextFeild from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const StyledTextFeild = styled(TextFeild)({
  width: "80%",
  border: "none",
});

export function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    msg: "",
    param: "",
  });
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
      .post("http://localhost:8086/signup", user)
      .then((res) => {
        if (res.data.errors) {
          setError({
            msg: res.data.errors[0].msg,
            param: res.data.errors[0].param,
          });
        } else {
          navigate("/login");
        }
      })

      .catch((err) => console.log(err.message));
  };
  return (
    <div id={style.signupContainer}>
      <div className={style.main}>
        <form className={style.signupForm} onSubmit={handleSubmit}>
          <label>SIGNUP</label>
          <StyledTextFeild
            id={style.signupUsername}
            className={style.text}
            label="Username"
            type="text"
            name="username"
            value={user.username}
            onChange={createUser}
            onClick={() => setError({ msg: "", param: "" })}
          />
          {error.param === "username" && (
            <span className={style.error}>
              *Username must be atleast 3 characters long
            </span>
          )}

          <StyledTextFeild
            id={style.signupEmail}
            name="email"
            value={user.email}
            className={style.text}
            label="Email"
            type="email"
            onChange={createUser}
            onClick={() => setError({ msg: "", param: "" })}
          />
          {error.param === "email" && (
            <span className={style.error}>{`*${error.msg}`}</span>
          )}

          <StyledTextFeild
            id={style.signupPassword}
            name="password"
            value={user.password}
            className={style.text}
            label="Password"
            type="password"
            onChange={createUser}
            onClick={() => setError({ msg: "", param: "" })}
          />
          {error.param === "password" && (
            <span className={style.error}>{`*${error.msg}`}</span>
          )}
          <button type="submit" className={style.submit}>
            Signup
          </button>
          <Link to={"/login"}>
            <p className={style.link}>Already have an account?Sign In</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
