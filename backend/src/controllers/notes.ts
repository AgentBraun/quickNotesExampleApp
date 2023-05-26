import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { assertIsDefined } from '../util/assertisDefined';

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserID = req.session.userID;

  try {
    assertIsDefined(authenticatedUserID);
    const notes = await NoteModel.find({ userID: authenticatedUserID }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.noteID;
  const authenticatedUserID = req.session.userID;

  try {
    assertIsDefined(authenticatedUserID);

    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await NoteModel.findById(noteID).exec();

    if (!note) {
      throw createHttpError(404, 'note not found');
    }

    if (!note.userID.equals(authenticatedUserID)) {
      throw createHttpError(401, 'you cannot access this note!');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (
  req,
  res,
  next
) => {
  const title = req.body.title;
  const text = req.body.text;
  const authenticatedUserID = req.session.userID;

  try {
    assertIsDefined(authenticatedUserID);

    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await NoteModel.create({
      userID: authenticatedUserID,
      title,
      text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteID: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteID = req.params.noteID;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authenticatedUserID = req.session.userID;

  try {
    assertIsDefined(authenticatedUserID);

    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title');
    }

    const note = await NoteModel.findById(noteID).exec();
    if (!note) {
      throw createHttpError(404, 'note not found');
    }

    if (!note.userID.equals(authenticatedUserID)) {
      throw createHttpError(401, 'you cannot access this note!');
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.noteID;
  const authenticatedUserID = req.session.userID;
  try {
    assertIsDefined(authenticatedUserID);

    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await NoteModel.findById(noteID).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userID.equals(authenticatedUserID)) {
      throw createHttpError(401, 'you cannot access this note!');
    }

    await NoteModel.findByIdAndDelete(note);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
