import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note , updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className='d-flex justify-content-between'>
            <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully","success")}}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem