import { NextResponse } from 'next/server';
import { connect } from "@/lib/connect"; // Ensure proper connection
import Application from '@/models/Application'; // Your Application model

// Ensure the connection to MongoDB
connect();

export async function POST(req: Request) {
  try {
    // Parse the incoming request data
    const { userId, brandId, brandName, message } = await req.json();

    // Create a new application object
    const newApplication = new Application({
      userId,
      brandId,
      brandName,
      message,
    });

    // Save the new application to the database
    await newApplication.save();

    return NextResponse.json(
      { success: true, application: newApplication },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating application.' },
      { status: 500 }
    );
  }
}
