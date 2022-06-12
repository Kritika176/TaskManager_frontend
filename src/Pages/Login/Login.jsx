import style from "./login.module.css";
import axios from "axios";
import TextFeild from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useState } from "react";
const StyledTextFeild = styled(TextFeild)({
    width:"80%",
    border:"none",
}) ;


    export function Login() {
        const [user,setUser] = useState({
            email:"",
            password:""
        })

        const [error,setError] = useState("");
        const createUser = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setUser({
                ...user,
                [name]:value
            })
            
            }
            const handleSubmit = (e) => {
                e.preventDefault();
                axios.post("http://localhost:8086/login",user).then(res =>{
                    if(res.data.msg)
                    {
                    setError(res.data.msg)
                    }
                    else{
                        console.log(res.data.token,res.data.id)
                        setUser({
                            email:"",
                            password:""
                        })
                    }
                })
                
                .catch(err => console.log(err.message))
            }
  return (
    <div id={style.loginContainer}>
   <div className={style.main}>
        <form className={style.loginForm} onSubmit={handleSubmit}>
            <label>SIGNUP</label>
            
            <StyledTextFeild id={style.loginEmail} name="email" value={user.email} className={style.text} label="Email" type="email" onChange={createUser}  onClick={() => setError("")}/>
           
        

            <StyledTextFeild id={style.loginPassword} name="password" value={user.password} className={style.text} label="Password" type="password" onChange={createUser} onClick={() => setError("")}/>
            {error !== "" && <span className={style.error}>{`*${error}`}</span>}
            <button type="submit" className={style.submit}>Login</button>
            <p className={style.link}>Don't have an account?Sign Up</p>
        </form>
        
     </div>
    </div>
  )
}