import { Button } from 'react-bootstrap';

type Props = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

const NavBarLoggedOutview = ({ onSignUpClicked, onLoginClicked }: Props) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Registracija</Button>
      <Button onClick={onLoginClicked}>Uloguj se</Button>
    </>
  );
};

export default NavBarLoggedOutview;
