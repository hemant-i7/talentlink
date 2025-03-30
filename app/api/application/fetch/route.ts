import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/lib/connect";
import Application from '@/models/Application';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

connect();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // In a real implementation, you would store the user's NextAuth ID in your applications
    // For now, we're returning all applications since we've migrated from Clerk
    const applications = await Application.find({}).populate('brandId');
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error fetching applications.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, status } = await req.json();
    const application = await Application.findOneAndUpdate(
      { _id: applicationId },
      { status },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error updating application.' }, { status: 500 });
  }
}