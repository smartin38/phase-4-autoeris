import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

//Routes !!!
import App from './App';
import Home from './view/Home';
import Header from './header/Header';
import SubHeader from './header/SubHeader';

import Login from './form/Login';
import SignUp from './form/SignUp';

import Favorite from './dynamic/Favorite';
import Note from './dynamic/Note';
import Settings from './view/Settings';

// ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="home" element={<Home />} />
                <Route path="header" element={<Header />} />
                <Route path="subheader" element={<SubHeader />} />

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                <Route path="favorite" element={<Favorite />} />
                <Route path="note" element={<Note />} />
                <Route path="settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

