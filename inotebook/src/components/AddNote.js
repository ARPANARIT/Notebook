import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext'
const AddNote = () => {
    // will use noteContext to Add, Update , Delete a Note
    const context=useContext(noteContext);
    const{addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:""})


    // when submit
    const handleClick=(e)=>{
        e.preventDefault(); //to deny page reload
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})// to clear the fields after submit
    };
    // when something is typed in fields
    const onChange=(e)=>{
        // ... spread operator stores the prev state and value
        setNote({...note,[e.target.name]:e.target.value})
    };
  return (
    <div className='container-sm d-flex justify-content-center mb-3 border border-dark mt-5'>
    <div className='col-md-6 '>
      <div className='d-flex justify-content-center mb-3 mt-5'>
      <h1>Add Notes</h1>
      </div>
    <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'value={note.title} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description}onChange={onChange} autoComplete='off'/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag}onChange={onChange} autoComplete='off'/>
  </div>
  <div className='d-flex justify-content-center mb-3'>

  <button type="submit" className="btn btn-success" >Add Note</button>
  </div>
</form>
</div>
</div>
  )
}

export default AddNote