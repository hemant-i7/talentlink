import { NextResponse } from 'next/server';
import Application from '@/models/Application';
import { connect } from "@/lib/connect";

// Establish the database connection
connect();

export async function POST(request: Request) {
  try {
    console.log("Received POST request to /api/application/user");
    
    const body = await request.json();
    console.log("Request body:", body);
    
    const { userId } = body;
    if (!userId) {
      console.log("User ID is missing from request body");
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    console.log("Fetching applications for user:", userId);

    // Fetch applications for the specific user
    const applications = await Application.find({ userId })
      .populate('userId') // Populating user information
      .populate('brandId') // Populating brand information
      .select('brandId brandName message status name mobile socialCount socialLink createdAt'); // Explicitly select all fields including new ones

    console.log(`Found ${applications.length} applications for user ${userId}`);

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("Error in POST /api/application/user:", error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching applications.',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { applicationId, status, name, mobile, socialCount, socialLink } = await req.json();

    // Update application status and other fields
    const updateData = {
      status,
      ...(name && { name }),
      ...(mobile && { mobile }),
      ...(socialCount && { socialCount }),
      ...(socialLink && { socialLink }),
    };

    const application = await Application.findByIdAndUpdate(applicationId, updateData, { new: true })
      .populate('userId') // Populating user information after update
      .populate('brandId') // Populating brand information after update
      .select('brandId brandName message status name mobile socialCount socialLink createdAt'); // Explicitly select all fields including new ones

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("Error in PUT /api/application/user:", error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error updating application.',
      error: error.message
    }, { status: 500 });
  }
}