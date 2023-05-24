import { Form, Modal, Button } from 'react-bootstrap'
import {Note} from '../models/note'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'

type Props = {
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}

const AddNoteDialog = (props: Props) => {
  const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<NoteInput>();

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = await NotesApi.createNote(input);
      props.onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={props.onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add Note
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className={'mb-3'}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={'Title'}
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={'mb-3'}>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={'Text'}
              rows={5}
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button 
        type="submit"
        form="addNoteForm"
        disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddNoteDialog