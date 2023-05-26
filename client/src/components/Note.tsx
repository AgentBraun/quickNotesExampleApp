import classes from '../styles/Note.module.css';
import classesUtils from '../styles/utils.module.css';
import { Button, Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface Props {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note: React.FC<Props> = ({ onNoteClicked, note, onDeleteNoteClicked, className }: Props) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Editovan: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Kreiran: ' + formatDate(createdAt);
  }

  return (
    <Card className={`${classes.noteCard} ${className}`}>
      <Card.Header>
        <Card.Title className={classesUtils.flexCenter}>
          {title}
          <Button
            className={`ms-auto ${classesUtils.flexCenter}`}
            onClick={() => {
              onDeleteNoteClicked(note);
            }}
          >
            <MdDelete />
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Body className={classes.cardBody} onClick={() => onNoteClicked(note)}>
        <Card.Title className={classesUtils.flexCenter}></Card.Title>
        <Card.Text className={classes.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
