import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { LoginCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import classesUtils from '../styles/utils.module.css';
import { useState } from 'react';
import { UnauthorizedError } from '../errors/http_error';

type Props = {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
};

const LoginModal = ({ onDismiss, onLoginSuccessful }: Props) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
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
        <Modal.Title>Uloguj se</Modal.Title>
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
            registerOptions={{ required: 'Requierd' }}
            error={errors.username}
          />
          <TextInputField
            name='password'
            label='Šifra'
            type='password'
            placeholder='*******'
            register={register}
            registerOptions={{ required: 'Requierd' }}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting} className={classesUtils.width100}>
            Uloguj se
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
