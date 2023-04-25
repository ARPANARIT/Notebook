// to create state which can be accesible to any component

import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState = (props) => {//notestate  component also takes in props, which are used to pass any child components that will consume the context
  const host = 'http://localhost:3001';
  const notesInital = []
  const [notes, setNotes] = useState(notesInital); // reads already present notes
  //Get all Notes from MongoDb, export getNotes and call it in Notes.js file

  const getNote = async () => {
    // we will call api to get the notes from Mongodb
 
    //API call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Conetent-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    //set the above fetched notes on react app
    setNotes(json)

  }

  // Add a Note function- Create C
  //--------------------------------------------------------------------------------------

  // addNote 
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // add your auth token here
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const data = await response.json();
      setNotes(notes.concat(data))
      console.log("New note added:", data);
      // you can update your state or UI as required here
    } catch (error) {
      console.error(error);
      // handle error as required
    }
  };

//-------------------------------------------------------------------------------------
// Edit a Note - Create U

const editNote = async (id, title, description, tag) => {
  // API call backend
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'POST',
    headers: {
      'Conetent-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDA2ODNlOTI3MjY2MWFjNjNkNWY0In0sImlhdCI6MTY4MTkxOTY0NX0.Q349Y6_7bgKPlc1AlLfPO7i3zdrHUb8FYAPpO4ipxeA'
    },
    body: JSON.stringify({ title, description, tag })
  });
  // eslint-disable-next-line
  const editjson = response.json();

  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];//edit note with passed id should match the id from the notes array
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
}



//-------------------------------------------------------------------------------------
// Delete a Note - Create D
const deleteNote = async (id) => {// id is coming from NoteItem
  console.log("del note : " + id);
  const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
    method: 'DELETE',
    headers: {
      'Conetent-type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
  });
  const json = response.json();
  console.log(json);
  // remove note from state
  setNotes(notes.filter((note) => note._id !== id));
  // const newNote = notes.filter((note) => { return note._id !== id })//return only those notes whose id is not equal to current id which has called the delete function
  // setNotes(newNote);

}

return (
  <>
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>
      {/* export notes,addNote,editNote,deleteNote,getNote */}
      {props.children}
      {/* // provides the variables and function values to any child components that consume the context. */}
    </noteContext.Provider>
  </>
)
}

export default NoteState;