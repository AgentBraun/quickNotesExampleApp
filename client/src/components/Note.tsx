import classes from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';

interface Props {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: Props) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <Card className={`${classes.noteCard} ${className}`}>
      <Card.Body className={classes.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={classes.cardText}>/{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdAt}</Card.Footer>
    </Card>
  );
};

export default Note;
