import { Container } from 'react-bootstrap';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import classes from '../styles/NotesPage.module.css';
import { User } from '../models/user';
import AdminView from '../components/AdminView';

type Props = {
  loggedInUser: User | null;
};

const NotesPage = (props: Props) => {
  return (
    <Container className={classes.notesPage}>
      <>
        {props.loggedInUser ? (
          <>{props.loggedInUser.roll ? <NotesPageLoggedInView /> : <AdminView />}</>
        ) : (
          <NotesPageLoggedOutView />
        )}
      </>
    </Container>
  );
};

export default NotesPage;
