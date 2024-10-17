import mongoose, { Document, Schema } from "mongoose";

// Define the properties for the Application model
export interface IApplication extends Document {
  userId: string;
  brandId: mongoose.Schema.Types.ObjectId;
  brandName: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  name: string;
  mobile: string;
  socialCount: number;
  socialLink: string;
  createdAt: Date;
}

// Create the Application schema
const applicationSchema: Schema<IApplication> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand", // Assuming the Brand model is already defined
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  socialCount: {
    type: Number,
    required: true,
  },
  socialLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Application model
const Application = mongoose.models.Application || mongoose.model<IApplication>("Application", applicationSchema);

export default Application;