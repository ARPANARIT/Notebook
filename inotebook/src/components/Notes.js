import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    //will use noteContext to read R the context
    const context=useContext(noteContext);
    const{notes,getNote}=context;
    const navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('token')){

        getNote()
      }
      else{
          navigate('/login')
      }
    },[])//display the notes from getNotes
  return (
    
<>
         <AddNote/>
         <div className='container d-flex justify-content-center mb-3'>
    <div className='row my-3'>
        <h1>Your Notes</h1>
         {notes.map((note)=>{//notes coming from context and passing one by one note to the noteitem
             return  <NoteItem  key={note._id } note={note}/>
             //  give a property of key from mongodb id 
             
            })}
            </div>
            </div>

   


            </>
  )
}

export default Notes