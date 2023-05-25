import { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import classes from './styles/NotesPage.module.css';
import classesUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddEditNoteDialog';
import { FaPlus } from 'react-icons/fa';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNodeToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${classes.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={classes.note}
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNodeToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={classes.notesPage}>
      <Button
        className={`mb-4 ${classesUtils.blockCenter} ${classesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new Note
      </Button>

      {notesLoading && <Spinner animation='border' variant='primary' />}
      {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}

      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}</>
      )}

      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes((prevNotes) => {
              return [...prevNotes, newNote];
            });
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNodeToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id ? updatedNote : existingNote
              )
            );
            setNodeToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
