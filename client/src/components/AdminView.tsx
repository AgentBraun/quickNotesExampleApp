import { useState, useEffect } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from '../network/notes_api';
import classes from '../styles/utils.module.css';
import EditUserModal from './EditUserModal';

type Props = {};

const AdminView = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [showUsersLoadingError, setShowUsersLoadingError] = useState(false);

  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setShowUsersLoadingError(false);
        setUsersLoading(true);
        const users = await NotesApi.getUsers();
        setUsers(users);
      } catch (error) {
        console.log(error);
        setShowUsersLoadingError(true);
      } finally {
        setUsersLoading(false);
      }
    };
    loadUsers();
  }, []);

  const deleteUser = async (user: User) => {
    try {
      await NotesApi.deleteUser(user._id);
      setUsers(users.filter((existingUser) => existingUser._id !== user._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Korisničko ime</th>
            <th>Email</th>
            <th className={classes.flexCenter}>opcije</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {user.roll ? (
                  <td className={classes.flexCenter}>
                    <Button variant='danger' size='sm' onClick={() => deleteUser(user)}>
                      izbriši
                    </Button>{' '}
                    <Button onClick={() => setShowEditUserDialog(true)} size='sm'>
                      Uredi
                    </Button>
                  </td>
                ) : (
                  <td className={classes.flexCenterRow}>Admin</td>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
      {usersLoading && (
        <Container className={classes.flexCenter}>
          <Spinner animation='border' variant='primary' />
        </Container>
      )}
      {showUsersLoadingError && <p>Something went wrong. Please refresh the page</p>}

      {showEditUserDialog && (
        <EditUserModal
          userToEdit={userToEdit}
          onDismis={() => {
            setShowEditUserDialog(false);
          }}
          onUserSaved={(updatedUser) => {
            setUsers(
              users.map((existingUser) =>
                existingUser._id === updatedUser._id ? updatedUser : existingUser
              )
            );
            setShowEditUserDialog(false);
          }}
        />
      )}
    </>
  );
};

export default AdminView;
