import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import classesUtils from '../styles/utils.module.css';

type Props = {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
};

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Registruj se</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
