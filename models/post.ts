// models/Brand.ts

import mongoose, { Document, Schema } from 'mongoose';

// Define the properties for the Brand model
export interface IBrand extends Document {
  name: string;
  description: string;
  moneyOffered: string;
  sponsorshipAvailable: boolean;
  imageUrl: string;
  status?: string; // Optional field for status
}



// Create the Brand schema
const brandSchema: Schema<IBrand> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  moneyOffered: {
    type: String,
    required: true,
  },
  sponsorshipAvailable: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted', 'waiting', 'rejected'],
    default: 'waiting',
  },
});

// Create the Brand model
const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema)
export default Brand;
