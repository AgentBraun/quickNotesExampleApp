import { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import classes from './styles/NotesPage.module.css';
import classesUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api'
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes()
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <Container>
      <Button className={`mb-4 ${classesUtils.blockCenter} `} onClick={()=>setShowAddNoteDialog(true)}>Add new Note</Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={classes.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && <AddNoteDialog onDismiss={()=>setShowAddNoteDialog(false)} onNoteSaved={(newNote)=>{
        setNotes((prevNotes)=> {return[...prevNotes, newNote]})
        setShowAddNoteDialog(false);
      }}/>}
    </Container>
  );
}

export default App;
