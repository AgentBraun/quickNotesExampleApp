import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import classes from './styles/NotesPage.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        const notes = await response.json();
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
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={classes.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;