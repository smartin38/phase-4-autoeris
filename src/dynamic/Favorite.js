import { React } from 'react'

import "./favorite.css"

export default function Post() {
    return (
        <div className="favorite">
            <div className="favoriteInfo">
                <span className="favoriteTitle">Post Title</span>
                <hr />
            </div>
            <p className="favoriteDesc"></p>
        </div>
    )
}
