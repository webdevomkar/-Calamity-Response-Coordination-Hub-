import { Schema, model } from 'mongoose';
// import { RescueAgency } from '../types/schema';

const RescueSosSchema = new Schema(
  {
    rescue_id: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
      required: true,
    },
    sos_id: {
      type: Schema.Types.ObjectId,
      ref: 'Sos',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RescueSos = model('RescueSos', RescueSosSchema, 'rescue-sos');

export default RescueSos;
