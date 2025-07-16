import { Schema, model } from 'mongoose';
import { Sos } from '../types/schema';

const SosSchema = new Schema<Sos>(
  {
    typeOfDisaster: {
      type: String,
      enum: [
        'Earthquakes',
        'floods',
        'Thunderstorm',
        'Tornado',
        'Cyclone',
        'Industrial accident',
        'Heatwave',
        'Landslide',
        'Forest fire',
      ],
      required: true,
    },
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

SosSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
SosSchema.index({ location: '2dsphere' });

const Sos = model<Sos>('Sos', SosSchema, 'sos');

export default Sos;
