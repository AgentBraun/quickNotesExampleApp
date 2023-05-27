import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { UserInput } from '../network/notes_api';
import { Button, Form, Modal } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import * as NotesApi from '../network/notes_api';

type Props = {
  userToEdit: User | null;
  onDismis: () => void;
  onUserSaved: (user: User) => void;
};

const EditUserModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    defaultValues: {
      username: props.userToEdit?.username,
      email: props.userToEdit?.email,
    },
  });

  const onSubmit = async (input: UserInput) => {
    try {
      let userResponse: User;

      userResponse = await NotesApi.updateUser(props.userToEdit!._id, input);

      props.onUserSaved(userResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Modal show onHide={props.onDismis}>
      <Modal.Header closeButton>
        <Modal.Title>Uredi Korisnika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='editUserForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Korisničko ime'
            type='text'
            placeholder=''
            register={register}
            registerOptions={{ required: 'Obavezno polje' }}
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='text'
            placeholder=''
            register={register}
            registerOptions={{ required: 'Obavezno polje' }}
            error={errors.email}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='editUserForm' disabled={isSubmitting}>
          {isSubmitting ? 'Sprema se...' : 'Sačuvaj'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
