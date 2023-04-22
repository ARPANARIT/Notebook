import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
const NoteItem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote,editNote}=context;// bring deleteNote from context
    const {note}=props;
  return (
    
// to display the notes Read R
    <div className='col-md-4'>

    <div className="card my-3" >
  
  <div className="card-body bg-warning">
    <h5 className="card-title fs-3 fw-bold">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>

    <div className='mx-6'>
      {/* delete function trigger when clicked on icon del */}
    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="far fa-edit" onClick={()=>{editNote(note._id)}}></i>
    </div>
       </div>
    

    </div>
</div>
  )
}

export default NoteItem