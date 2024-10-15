import mongoose, { Mongoose } from "mongoose";

let mongoInstance: Mongoose | null = null;

export async function connect(): Promise<void> {
    try {
        if (!mongoInstance) {
            mongoInstance = await mongoose.connect(process.env.MONGODB_URI as string);

            mongoose.connection.on('connected', () => {
                console.log("Connected to MongoDB Atlas");
            });

            mongoose.connection.on('error', (err: Error) => {
                console.error("MongoDB connection error:", err);
            });
        }

    } catch (error: any) {
        console.log(error);
        throw new Error("MONGO ATLAS connection error: " + error.message);
    }
}