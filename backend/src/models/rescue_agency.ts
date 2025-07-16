import { Schema, model } from 'mongoose';
import { RescueAgency } from '../types/schema';

const RescueAgencySchema = new Schema<RescueAgency>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    phone: [{ type: String }],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['NDRF', 'SDRF', 'DDRF', 'NGO'],
    },
    
  },
  {
    timestamps: true,
  }
);

RescueAgencySchema.index({ location: '2dsphere' });

const RescueAgency = model<RescueAgency>(
  'RescueAgency',
  RescueAgencySchema,
  'rescue-agencies'
);

export default RescueAgency;
