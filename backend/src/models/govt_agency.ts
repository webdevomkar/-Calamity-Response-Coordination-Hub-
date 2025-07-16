import { Schema, model } from 'mongoose';
import { GovtAgency } from '../types/schema';

const GovtAgencySchema = new Schema<GovtAgency>({
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
});

GovtAgencySchema.index({ location: '2dsphere' });

const GovtAgency = model<GovtAgency>(
  'GovernmentAgency',
  GovtAgencySchema,
  'government-agencies'
);

export default GovtAgency;
