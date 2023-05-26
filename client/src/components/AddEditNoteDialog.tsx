import { Form, Modal, Button } from 'react-bootstrap';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import TextInputField from './form/TextInputField';

type Props = {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
};

const AddEditNoteDialog = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: props.noteToEdit?.title || '',
      text: props.noteToEdit?.text || '',
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (props.noteToEdit) {
        noteResponse = await NotesApi.updateNote(props.noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      props.onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Modal show onHide={props.onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{props.noteToEdit ? 'Uredi bilješku' : 'Dodaj novu bilješku'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='title'
            label='Naslov'
            type='text'
            placeholder='Moja nova bilješka'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />
          <TextInputField
            as='textarea'
            rows={5}
            name='text'
            label='Tekst'
            placeHolder='Kupiti mlijeko, voće i povrće, hljeb.'
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
          Spremi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
