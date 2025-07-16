import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commonerSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
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

commonerSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
const commoner = mongoose.model('Commoner', commonerSchema);

export default commoner;
