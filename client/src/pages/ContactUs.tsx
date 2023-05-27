import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function AboutUs() {
  const [validated, setValidated] = useState(false);

  return (
    <Form noValidate validated={validated}>
      <Row className='mb-3'>
        <Form.Group as={Col} md='4' controlId='validationCustom01'>
          <Form.Label>Ime i prezime</Form.Label>
          <Form.Control required type='text' placeholder='Niko Neznanović' />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='4' controlId='validationCustom02'>
          <Form.Label>Email</Form.Label>
          <Form.Control required type='email' placeholder='primjer@test.com' />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='4' controlId='validationCustomUsername'>
          <Form.Label>korisničko ime</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='allen23'
              aria-describedby='inputGroupPrepend'
              required
            />
            <Form.Control.Feedback type='invalid'>Please choose a username.</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} md='6' controlId='validationCustom03'>
          <Form.Label>Grad</Form.Label>
          <Form.Control type='text' placeholder='Zenica' required />
          <Form.Control.Feedback type='invalid'>Please provide a valid city.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='3' controlId='validationCustom04'>
          <Form.Label>Ulica</Form.Label>
          <Form.Control type='text' placeholder='Fakultetska 13' required />
          <Form.Control.Feedback type='invalid'>
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md='3' controlId='validationCustom05'>
          <Form.Label>Poštanski broj</Form.Label>
          <Form.Control type='text' placeholder='73000' required />
          <Form.Control.Feedback type='invalid'>Please provide a valid zip.</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className='mb-3'>
        <Form.Label>Poruka</Form.Label>
        <Form.Control as='textarea' rows={5} placeholder={'Napišite nam poruku ovdje:'} />
      </Form.Group>
      <Button
        onClick={(e) => {
          e.preventDefault();
        }}
        type='submit'
      >
        Pošalji upit
      </Button>
    </Form>
  );
}

export default AboutUs;
