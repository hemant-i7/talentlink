import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/lib/connect";
import Application from '@/models/Application';
import { useAuth } from '@clerk/nextjs';

connect();

export async function GET(req: NextRequest) {
  try {
    const { userId } = useAuth();

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const applications = await Application.find({ userId }).populate('brandId');
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error fetching applications.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = useAuth();

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, status } = await req.json();
    const application = await Application.findOneAndUpdate(
      { _id: applicationId, userId },
      { status },
      { new: true }
    );

    if (!application) {
      return NextResponse.json({ success: false, message: 'Application not found or not owned by user.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error updating application.' }, { status: 500 });
  }
}