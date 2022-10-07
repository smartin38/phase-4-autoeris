import { useState } from "react";
import AuthBar from "../components/dashboard/auth/AuthBar";
import AuthLoginForm from "../components/dashboard/auth/AuthLoginForm";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const MySwal = withReactContent(Swal)

    function handleSignin(){
        if(username === "" || password === ""){
            MySwal.fire({
                title: <p>Empty Fields</p>,
                text: "Please fill in all the fields",
                icon: "error",
                confirmButtonText: "Ok"
            })
        }
        else{
            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.id !== undefined){
                localStorage.setItem("id", data.id);
                window.location.href = "/dashboard";
            }else{
                MySwal.fire({
                    title: "Error",
                    text: "You have entered an invalid email or password",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            }
        })
    }
    }

    return (
        <>
            <AuthBar />
            <AuthLoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} signin={handleSignin} />
        </>
    );
}

export default Login;