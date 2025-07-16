import { Schema, model } from 'mongoose';
import { Resource } from '../types/schema';

const ResourceSchema = new Schema<Resource>(
  {
    agency_id: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = model<Resource>('Resource', ResourceSchema, 'resources');

export default Resource;
