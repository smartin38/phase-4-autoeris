import React, { useState } from 'react'

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.jwt)
                handleLogin(data.user)
                console.log(data)
            })


    }
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "13%"
    }
    return (
        <div>
            <div style={formDivStyle}>
                <h1>Log In</h1>
                <form class="ui form" onSubmit={handleSubmit}>
                    <div class="field">
                        <label>Username</label>
                        <input value={username} onChange={handleUsernameChange} type="text" placeholder="username" />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" />
                    </div>

                    <button class="ui button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login