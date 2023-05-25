import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import userModel from '../models/user';

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (
  req,
  res,
  next
) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'parameters are missing');
    }

    const existingUsername = await userModel.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(409, 'Username already Exists!');
    }

    const existingEmail = await userModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'A user with this email already exists!');
    }
  } catch (error) {
    next(error);
  }
};
