import { useState, useEffect } from "react";

import DashboardBar from "../components/dashboard/DashboardBar";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import DashboardPasswordList from "../components/dashboard/dashboard/DashboardPasswordList";
import DashboardPassword from "../components/dashboard/dashboard/DashboardPassword";
import DashboardAddNewPasswordModal from "../components/dashboard/dashboard/DashboardAddNewPasswordModal";
import DashboardEditNote from "../components/dashboard/dashboard/DashboardEditNote";
import Swal from 'sweetalert2';
import withReactNote from 'sweetalert2-react-content';

function Landing() {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    // const [favoriteId, setFavoriteId] = useState("");
    const [notes, setNotes] = useState([]);
    // const [favorites, setFavorites] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const [toogleAddNewNote, setToogleAddNewNote] = useState(false);
    const [toogleEditNote, setToogleEditNote] = useState(false);
    const MySwal = withReactNote(Swal)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/notes/user/" + localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                setNotes(data);
            })

        // fetch("http://localhost:3000/favorites")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFavorites(data);
        //         setFavoriteId(data[0].id);
        //     });

        // Set user id from local storage
        setUserId(localStorage.getItem("id"));
    }, []);

    const handleAddNewPassword = () => {
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                content: content,
                user_id: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                setNotes([...notes, data]);
                setToogleAddNewNote(false);
                MySwal.fire({
                    content: "Success",
                    text: "Note added successfully",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
            })
    }

    const handleToogleEditNote = () => {
        setName(selectedNote.name);
        setContent(selectedNote.content);
        setToogleEditNote(!toogleEditNote);
    }

    const handleEditNote = () => {
        fetch("http://localhost:3000/notes/" + selectedNote.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                content: content,
                user_id: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                setNotes(notes.map(Note => {
                    if (Note.id === data.id) {
                        return data;
                    } else {
                        return Note;
                    }
                }));
                setToogleEditNote(false);
                MySwal.fire({
                    name: "Success",
                    text: "Note edited successfully",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
            })
    }

    const handleSelectedNote = (key) => {
        setSelectedNote(notes[key]);
    }

    const handleToogleAddNewNote = () => {
        setToogleAddNewNote(!toogleAddNewNote);
    }

    const handleLogout = () => {
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    return (
        <>
            <DashboardBar logout={handleLogout} page="Dashboard" />
            <div className="flex col">
                <DashboardPasswordList notes={notes} handleSelectedNote={handleSelectedNote} handleToogleAddNewNote={handleToogleAddNewNote} />
                <DashboardPassword  selectedNote={selectedNote} handleToogleEditNote={handleToogleEditNote} />
                {
                    toogleAddNewNote ?
                        <DashboardAddNewPasswordModal handleToogleAddNewNote={handleToogleAddNewNote} handleAddNewPassword={handleAddNewPassword} name={name} setName={setName} content={content} setContent={setContent} />
                        :
                        null
                }
                {
                    toogleEditNote ?
                        <DashboardEditNote handleToogleEditNote={handleToogleEditNote} handleEditNote={handleEditNote} name={name} setName={setName} content={content} setContent={setContent} selectedNote={selectedNote} />
                        :
                        null
                }
            </div>
            <DashboardFooter />
        </>
    );
}

export default Landing;