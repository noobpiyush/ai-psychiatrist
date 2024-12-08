import { Schema, model, Document } from 'mongoose';

interface ChatLog {
  timestamp?: Date;
  message: string;
  isUser: boolean; // true if user sent the message, false if it's the AI response
}

interface User extends Document {
  name: string;
  email: string;
  password: string; // Use bcrypt or another library for hashing passwords
  chatLogs?: ChatLog[];
}

const ChatLogSchema = new Schema<ChatLog>({
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
  isUser: { type: Boolean, required: true },
});

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chatLogs: { type: [ChatLogSchema], default: [] },
});

export const UserModel = model<User>('User', UserSchema);
