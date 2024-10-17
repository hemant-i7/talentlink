import { NextResponse } from 'next/server';
import { connect } from "@/lib/connect"; // Ensure proper connection
import Application from '@/models/Application'; // Your Application model

// Ensure the connection to MongoDB
connect();

export async function GET(req: Request) {
  try {
    // Fetch all applications and populate user information
    const applications = await Application.find().populate("userId"); // Adjust as per your user schema

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: 'Error fetching applications.' },
      { status: 500 }
    );
  }
}
