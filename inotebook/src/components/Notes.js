import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    //will use noteContext to read R the context
    const context=useContext(noteContext);
    const{notes,addNote}=context;

  return (
    
<>
         <AddNote/>
         <div className='container'>
    <div className='row my-3'>
        <h1>Your Notes</h1>
         {notes.map((note)=>{
             return  <NoteItem  key={note._id} note={note}/>
             //  give a property of key from mongodb id 
             
            })}
            </div>
            </div>

   


            </>
  )
}

export default Notes