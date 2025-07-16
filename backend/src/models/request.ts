import { Schema, model } from 'mongoose';
import { DRequest } from '../types/schema';

const RequestSchema = new Schema<DRequest>(
  {
    govt_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'GovernmentAgency',
    },
    rescue_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
    },
    requestee_id: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
    },
    requested_items: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
        },
      },
    ],

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DRequest = model<DRequest>('Request', RequestSchema, 'requests');

export default DRequest;
