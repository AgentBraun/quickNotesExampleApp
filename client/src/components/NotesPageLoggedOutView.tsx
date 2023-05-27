import React from 'react';
import { Container } from 'react-bootstrap';
import ControlledCarousel from './landing/Carousel';
import HeroSection from './ui/hero';

type Props = {};

const NotesPageLoggedOutView = (props: Props) => {
  return (
    <Container>
      <ControlledCarousel />
      <HeroSection />
    </Container>
  );
};

export default NotesPageLoggedOutView;
