import { React } from 'react'

import "./header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="topLeft">
                <h1 className="autoeris">AutoEris</h1>
                <i className="topIcon fa-brands fa-github"></i>
                <i className="topIcon fa-brands fa-discord"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">HOME</li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">WRITE</li>
                    <li className="topListItem">LOGOUT</li>


                </ul>
            </div>
            <div className="topRight">
                <img
                    className="topImg"
                    src=""
                    alt=""
                />
                {/* this is the magnifying glass for the search */}
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>


            </div>
        </div>

    )
}