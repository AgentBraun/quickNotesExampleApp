import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import userModel from '../models/user';
import noteModel from '../models/note';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.session.userID).select('+email').exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
  const roll = 1;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Popunite sva obavezna polja.');
    }

    const existingUsername = await userModel.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(409, 'Korisničko ime već postoji.');
    }

    const existingEmail = await userModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'Korisnik sa unesenom Email adresom već postoji.');
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: passwordHashed,
      roll,
    });

    req.session.userID = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
  req,
  res,
  next
) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Popunite sva obavezna polja');
    }
    const user = await userModel.findOne({ username: username }).select('+password +email').exec();

    if (!user) {
      throw createHttpError(401, 'Korisničko ime nije tačno');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, 'Šifra nije tačna');
    }

    req.session.userID = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userModel.find({}).exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    if (!mongoose.isValidObjectId(userID)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const user = await userModel.findById(userID).exec();

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    await noteModel.deleteMany({ userID: userID });
    await userModel.findByIdAndDelete(userID);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

interface UpdateUserParams {
  userID: string;
}

interface UpdateUserBody {
  username?: string;
  email?: string;
}

export const updateUser: RequestHandler<
  UpdateUserParams,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res, next) => {
  const userID = req.params.userID;
  const newUsername = req.body.username;
  const newEmail = req.body.email;

  try {
    if (!mongoose.isValidObjectId(userID)) {
      throw createHttpError(400, 'Invalid user ID');
    }

    if (!newUsername) {
      throw createHttpError(400, 'Korisnik mora da ima korisničko ime');
    }

    if (!newEmail) {
      throw createHttpError(400, 'Korisnik mora da ima email adresu');
    }

    const user = await userModel.findById(userID).exec();

    if (!user) {
      throw createHttpError(404, 'Korisnik nije pronađen');
    }

    user.username = newUsername;
    user.email = newEmail;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
