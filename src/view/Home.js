import { React } from 'react'

import Header from "../header/Header"
import Favorite from "../dynamic/Favorite"
import Note from "../dynamic/Note"
import "./home.css"

export default function Home() {
    return (
        <>
            <Header />
            <div className="home">
                <Favorite />
                <Note />
            </div>
        </>
    )
}
