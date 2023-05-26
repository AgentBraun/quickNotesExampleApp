import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from '../network/notes_api';

type Props = {};

const AdminView = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [showUsersLoadingError, setShowUsersLoadingError] = useState(false);

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

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Korisničko ime</th>
            <th>email</th>
            <th>opcije</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {user.roll ? (
                  <td>
                    <Button variant='danger' size='sm'>
                      izbriši
                    </Button>{' '}
                    <Button size='sm'>Uredi</Button>
                  </td>
                ) : (
                  ''
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminView;
