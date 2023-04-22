// to create state which can be accesible to any component

import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState=(props)=>{
  const host='http://localhost:3001';
    const notesInital=[]
    const [notes,setNotes]=useState(notesInital); // reads already present notes
//Get all Notes from MongoDb, export getNotes and call it in Notes.js file

const getNote=async(title,description,tag)=>{
  // we will call api to get the new note
  //console.log("Adding a note");
  //API call 
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'Conetent-type':'application/json',
      'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDA2ODNlOTI3MjY2MWFjNjNkNWY0In0sImlhdCI6MTY4MTkxOTY0NX0.Q349Y6_7bgKPlc1AlLfPO7i3zdrHUb8FYAPpO4ipxeA'
    },
  });
 const json=await response.json();
 console.log(json);
//set the above fetched notes on react app
setNotes(json)

}

// Add a Note function- Create C
//--------------------------------------------------------------------------------------
const addNote=async(title,description,tag)=>{
    // we will call api to get the new note
    //console.log("Adding a note");
    //API call 
    const response=await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers:{
        'Conetent-type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDA2ODNlOTI3MjY2MWFjNjNkNWY0In0sImlhdCI6MTY4MTkxOTY0NX0.Q349Y6_7bgKPlc1AlLfPO7i3zdrHUb8FYAPpO4ipxeA'
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=response.json();

    const note={
        "_id": "6440aff46a69219d816fa8411",
        "user": "64400683e9272661ac63d5f4",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-04-20T03:22:28.751Z",
        "__v": 0
    };
    setNotes(notes.concat(note)) // return array with new value appended
}
//-------------------------------------------------------------------------------------
// Edit a Note - Create U
const editNote=async(id,title,description,tag)=>{
// API call backend
const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
  method:'POST',
  headers:{
    'Conetent-type':'application/json',
    'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MDA2ODNlOTI3MjY2MWFjNjNkNWY0In0sImlhdCI6MTY4MTkxOTY0NX0.Q349Y6_7bgKPlc1AlLfPO7i3zdrHUb8FYAPpO4ipxeA'
  },
  body:JSON.stringify({title,description,tag})
});
const editjson=response.json();

for(let index=0;index<notes.length;index++){
    const element=notes[index];//edit note with passed id should match the id from the notes array
    if(element._id===id){
      element.title=title;
      element.description=description;
      element.tag=tag;
    }
  }
}



//-------------------------------------------------------------------------------------
// Delete a Note - Create D
const deleteNote=(id)=>{// id is coming from NoteItem
   // console.log("del note : "+id);
  const newNote=notes.filter((note)=>{return note._id!==id})//return only those notes whose id is not equal to current id which has called the delete function
  setNotes(newNote);
}

    return (
        <>
        <noteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote}}> 
        {/* export notes,addNote,editNote,deleteNote,getNote */}
            {props.children}
        </noteContext.Provider>
        </>
    )
}

export default NoteState;