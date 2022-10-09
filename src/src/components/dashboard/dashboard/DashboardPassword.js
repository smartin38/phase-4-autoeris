import { Hero, Button } from "react-daisyui";
import { format, parseISO } from "date-fns";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { React } from 'react'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function DashboardPassword({ favorites, favoriteId, setFavoriteId, selectedNote, handleToogleEditNote }) {
  const MySwal = withReactContent(Swal)
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
      confirmButton: "btn btn-error",
      cancelButton: "btn btn-error",
    },
      buttonsStyling: false,
  });

  const handleDeleteNote = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:9292/notes/"+selectedNote.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => {
      swalWithBootstrapButtons.fire(
        "Deleted!",
        "Your file has been deleted.",
        "success"
      );
      window.location.reload();
    })
  } 
  else if (result.dismiss === Swal.DismissReason.cancel){
    swalWithBootstrapButtons.fire(
      "Cancelled",
      "Your file is safe :)",
      "error"
    );}
  });
  }

  return (
    <div className="w-4/6 ">
      {selectedNote ? (
        <>
          <Hero>
            <Hero.Content className="flex-col w-4/6">
              <div className="flex flex-row space-x-4 place-items-center max-w">
                <h1>
                  Title: <p className="font-bold">{selectedNote.title}</p>
                </h1>
                <h1>
                  Date & Time:{" "}
                  <p className="font-bold">
                    {format(
                      parseISO(selectedNote.created_at),
                      "dd/mm/yyyy HH:mm:ss"
                    )}
                  </p>
                </h1>
                <h1>
                  favorite:
                  <p className="font-bold">
                    {favorites.map((favorite) => {
                      if (favorite.id === selectedNote.favorite_id) {
                        return favorite.name;
                      }
                      else {
                        return null;
                      }
                    })}
                  </p>
                </h1>
                <Button onClick={() => handleToogleEditNote()}>
                  <FaPencilAlt />
                </Button>
                <Button onClick={() => handleDeleteNote(selectedNote.id)} color="error" className="text-white">
                  <FaTrash />
                </Button>
              </div>
              <div className="flex-col text-center space-y-5">
                <div className="flex flex-row space-x-5">
                  <p>{selectedNote.Note}</p>
                </div>
              </div>
            </Hero.Content>
          </Hero>
        </>
      ) : (
        <Hero>
          <Hero.Content>
            <h1 className="text-2xl font-bold">No Note Selected</h1>
          </Hero.Content>
        </Hero>
      )}
    </div>
  );
}

export default DashboardPassword;
