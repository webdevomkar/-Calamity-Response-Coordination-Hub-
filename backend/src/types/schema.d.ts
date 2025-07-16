import { Request } from 'express';
import { Date, Types } from 'mongoose';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type Location = {
  type: string;
  coordinates: number[];
};

export type GovtAgency = {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  email: string;
  phone: string[];
  location: Location;
  address: string;
};

export type RescueAgency = {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  phone: string[];
  location: Location;
  address: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type Inventory = {
  id: Types.ObjectId;
};

export type RequestItem = {
  type: string;
  name: string;
  qty: number;
  unit?: string;
};

export type DRequest = {
  govt_requester_id?: Types.ObjectId;
  rescue_requester_id?: Types.ObjectId;
  requestee_id: Types.ObjectId;
  requested_items: RequestItem[];
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type Resource = {
  agency_id: Types.ObjectId;
  type: string;
  name: string;
  quantity: number;
  unit?: string;
  created_at: Date;
  updated_at: Date;
};

export interface AuthenticatedReq extends Request {
  user?: {
    id: string;
    email: string;
    hash: number;
  };
}

type Message = {
  content: string;
  sender: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

type Chat = {
  members: Types.ObjectId[];
  messages: Message[];
  lastMsg?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

type Sos = {
  typeOfDisaster: string;
  location: Location;
  createdAt: Date;
}
