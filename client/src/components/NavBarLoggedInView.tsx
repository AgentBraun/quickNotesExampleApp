import { Button, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from '../network/notes_api';

type Props = {
  user: User;
  onLogoutSuccessful: () => void;
};

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: Props) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className='me-2'>Ulogovan kao: {user.username}</Navbar.Text>
      <Button onClick={logout}>Odjavi se</Button>
    </>
  );
};

export default NavBarLoggedInView;
