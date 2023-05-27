import React from 'react';
import { Container } from 'react-bootstrap';
import ControlledCarousel from './landing/Carousel';

type Props = {};

const NotesPageLoggedOutView = (props: Props) => {
  return (
    <Container>
      <ControlledCarousel />
    </Container>
  );
};

export default NotesPageLoggedOutView;
