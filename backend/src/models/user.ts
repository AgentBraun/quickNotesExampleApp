import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roll: { type: Number, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
