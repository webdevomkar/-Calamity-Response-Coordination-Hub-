import { ObjectId } from 'mongoose';
export {};
declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: ObjectId;
        email: string;
        role: number;
      };
    }
  }
}
