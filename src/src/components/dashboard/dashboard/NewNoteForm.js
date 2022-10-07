import React from "react";
import { useState } from 'react'


function NewNoteForm({reRender}) {


    const handleSubmit = (e) => {
        e.preventDefault()
        let newNote = {
            ...form,
        };
        console.log(newNote);
        fetch(`http://localhost:3000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
        }).then(
            reRender((render=>!render))
            )
    }

    const [form, setForm] = useState({
        name: "",
        content: "",
        user_id: "2",
        favorite_id: "6"
    })


    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })

    }

    console.log(form)

    return (
        <div>
            <form>
                <div>
                    <input onChange={handleChange} value={form.name}
                        type="text" name="name" placeholder="Name" style ={{width: '100px'}}/>
                    <input onChange={handleChange} value={form.content}
                        type="text" name="brand" placeholder="Brand" style ={{width: '100px'}}/>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewNoteForm;























// // Empty use state object in format used in db.
//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     description: "",
//     number: ""
//   })

// // Listens for change, duplicates object and populates with entered data.
//   const handleChange = (event) => {
//     setForm({
//       ...form,
//       [event.target.name]:event.target.value
//     })
//   }

// // On click, actually posts data to db and then resets form fields.
//   function handleSubmit(event) {
//     event.preventDefault()
//     fetch(`http://localhost:3000/contacts`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form),
//     }).then(
//     setForm({
//       id: "",
//       name: "",
//       description: "",
//       number: ""
//     }))
//   }

// // Displays new contact form and calls necessary functions, links back to home.
//   return (
//     <div className="box" style={{marginLeft: "646px", marginRight:"790px", width:"18%",  marginTop: "-40px", alignItems:'center'}}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input onChange={handleChange} value={form.name} 
//               type="text" name="name" placeholder="Name" />
//           <input onChange={handleChange} value={form.description} 
//               type="text" name="description" placeholder="Description" />
//           <input onChange={handleChange} value={form.number} 
//               type="tel" maxlength="10" name="number" placeholder="Number" />
//         </div>
//         <button type="submit">
//           Add Contact
//         </button>
//       </form>
//       <nav>
//         <button>
//           <Link to='/'>Home</Link>
//         </button>
//       </nav>
//     </div>
//   );
// }


