import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Chat } from '../types/schema';

const chatSchema = new Schema<Chat>(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RescueAgency',
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    lastMsg: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<Chat>('Chat', chatSchema);

export default Chat;
