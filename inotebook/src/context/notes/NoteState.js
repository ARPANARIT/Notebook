// to create state which can be accesible to any component

import { useState } from "react";
import noteContext from "./NoteContext";


const NoteState=(props)=>{
    const notesInital=
        [
            {
              "_id": "6440afeb6a69219d816fa843",
              "user": "64400683e9272661ac63d5f4",
              "title": "HARE KRSNA",
              "description": "Hare Krsna Hare Ksna Krsna Krsna Hare Hare || Hare Rama Hare Rama Rama Rama Hare Hare",
              "tag": "The Supreme Lord",
              "date": "2023-04-20T03:22:19.114Z",
              "__v": 0
            },
            {
              "_id": "6440aff06a69219d816fa845",
              "user": "64400683e9272661ac63d5f4",
              "title": "HARE KRSNA HARE RAMA",
              "description": "Hare Krsna Hare Ksna Krsna Krsna Hare Hare || Hare Rama Hare Rama Rama Rama Hare Hare",
              "tag": "Karma-yoga",
              "date": "2023-04-20T03:22:24.615Z",
              "__v": 0
            },
            {
              "_id": "6440aff46a69219d816fa847",
              "user": "64400683e9272661ac63d5f4",
              "title": "HARE KRSNA",
              "description": "Hare Krsna Hare Ksna Krsna Krsna Hare Hare || Hare Rama Hare Rama Rama Rama Hare Hare",
              "tag": "NO tag",
              "date": "2023-04-20T03:22:28.751Z",
              "__v": 0
            },
            {
                "_id": "6440aff46a69219d816fa849",
                "user": "64400683e9272661ac63d5f4",
                "title": "HARE KRSNA",
                "description": "Hare Krsna Hare Ksna Krsna Krsna Hare Hare || Hare Rama Hare Rama Rama Rama Hare Hare",
                "tag": "NO tag",
                "date": "2023-04-20T03:22:28.751Z",
                "__v": 0
              },
              {
                "_id": "6440aff46a69219d816fa840",
                "user": "64400683e9272661ac63d5f4",
                "title": "HARE KRSNA",
                "description": "Hare Krsna Hare Ksna Krsna Krsna Hare Hare || Hare Rama Hare Rama Rama Rama Hare Hare",
                "tag": "NO tag",
                "date": "2023-04-20T03:22:28.751Z",
                "__v": 0
              }
          ]
    const [notes,setNotes]=useState(notesInital); // reads already present notes
// Add a Note function- Create C
const addNote=(title,description,tag)=>{
    // we will call api to get the new note
    console.log("Adding a note");
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
// Edit a Note - Create U
const editNote=()=>{}
// Delete a Note - Create D
const deleteNote=(id)=>{// id is coming from NoteItem
    console.log("del note : "+id);
}

    return (
        <>
        <noteContext.Provider value={{notes,addNote,editNote,deleteNote}}> 
        {/* export notes and setNotes func */}
            {props.children}
        </noteContext.Provider>
        </>
    )
}

export default NoteState;