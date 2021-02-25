import React from 'react';
import "../styling/Login.scss";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { login } from "../features/appSlice";

function Login() {
    const dispatch = useDispatch();

    const SignIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">
           <div className="login__container">
                <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png" alt=""/>
                <Button variant="outlined" onClick={SignIn}>Sign In</Button>
           </div>
        </div>
    )
}

export default Login
