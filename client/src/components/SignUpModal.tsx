import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import classesUtils from '../styles/utils.module.css';
import { useState } from 'react';
import { ConflictError } from '../errors/http_error';
import { useNavigate } from 'react-router-dom';

type Props = {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
};

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: Props) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
      handleClick();
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Registruj se</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant='danger'>{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Korisničko ime'
            type='text'
            placeholder='NikoNeznanovic'
            register={register}
            registerOptions={{ required: 'Obavezno polje' }}
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='text'
            placeholder='primjer@test.com'
            register={register}
            registerOptions={{ required: 'Obavezno polje' }}
            error={errors.email}
          />
          <TextInputField
            name='password'
            label='Šifra'
            type='password'
            placeholder='*******'
            register={register}
            registerOptions={{ required: 'Obavezno polje' }}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting} className={classesUtils.width100}>
            Registruj se
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
