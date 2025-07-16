import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Message } from '../types/schema';

const messageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<Message>('Message', messageSchema);

export default Message;
