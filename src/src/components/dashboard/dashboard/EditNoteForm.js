// import React, { useState } from "react";

// function EditRoutine({reRender, id, body, onUpdateRoutine, product, routineBody, setRoutineBody }) {
 

//   function handleFormSubmit(e) {
//     e.preventDefault();

//     fetch(`http://localhost:3000/notes/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name:routineBody

//       }),
//     })
//       .then((r) => r.json())
//       .then(reRender((render=>!render))
//         )
//     }

//   return (
//     <form className="edit-message" onSubmit={handleFormSubmit}>
//       <input
//         type="text"
//         name="body"
//         autoComplete="off"
//         value={routineBody}
//         onChange={(e) => setRoutineBody(e.target.value)}
//       />
//       <input type="submit" value="Save" />
//       {console.log()}
//     </form>
//   );
// }

// export default EditRoutine;