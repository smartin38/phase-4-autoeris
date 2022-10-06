import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header'
import SignIn from './SignUp'
import Login from './Login'

function App() {
    const [user, setUser] = useState({})
    const [form, setForm] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:4000/auto_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setUser(data)
                    // console.log(data)
                })
        }
    }, [])

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleFormSwitch = (input) => {
        setForm(input)
    }

    const handleAuthClick = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:4000/user_is_authed`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    }



    const renderForm = () => {
        switch (form) {
            case "login":
                return <Login handleLogin={handleLogin} />
                // break;
            default:
                return <SignIn handleLogin={handleLogin} />
        }
    }
    return (
        <div className="App">
            <Header handleFormSwitch={handleFormSwitch} />
            {
                renderForm()
            }
            <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button>
        </div>
    );
}

export default App;
