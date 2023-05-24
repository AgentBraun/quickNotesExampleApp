import classes from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formatDate';

interface Props {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: Props) => {
  const { 
    title, 
    text, 
    createdAt, 
    updatedAt 
  } = note;

  let createdUpdatedText: string;
  if(updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${classes.noteCard} ${className}`}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>
          {title}
          </Card.Title>
        <Card.Text className={classes.cardText}>
          {text}
          </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createdUpdatedText}
        </Card.Footer>
    </Card>
  );
};

export default Note;
