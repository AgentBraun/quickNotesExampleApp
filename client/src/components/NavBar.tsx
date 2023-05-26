import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutview from './NavBarLoggedOutview';
import { Link } from 'react-router-dom';

type Props = {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
};

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: Props) => {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Moje Bilješke
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link as={Link} to='/aboutus'>
              O nama
            </Nav.Link>
            <Nav.Link as={Link} to='/contactus'>
              Kontakt
            </Nav.Link>
          </Nav>
          <Nav className={'ms-auto'}>
            {loggedInUser ? (
              <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
            ) : (
              <NavBarLoggedOutview
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
