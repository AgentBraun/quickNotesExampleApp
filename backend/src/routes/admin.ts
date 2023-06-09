import express from 'express';
import * as UserController from '../controllers/users';

const router = express.Router();

router.get('/users', UserController.getUsers);

router.delete('/:userID', UserController.deleteUser);

router.patch('/:userID', UserController.updateUser);

export default router;
