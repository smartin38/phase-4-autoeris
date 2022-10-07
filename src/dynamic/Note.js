import { React } from 'react'

import "./note.css"

export default function Note() {
    return (
        <div className="note">
            <form className="noteForm">
                <div className="noteFormGroup">
                    <label htmlFor="fileInput">
                        <i className="noteIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                    <input type="text" placeholder="Title" className="noteInput" autoFocus={true} />
                </div>
                <div className="noteFormGroup">
                    <textarea placeholder="take some notes!"
                        type="text"
                        className="noteInput writeText">
                    </textarea>
                </div>
                <button className="noteSubmit">Submit</button>
            </form>

        </div>
    )
}