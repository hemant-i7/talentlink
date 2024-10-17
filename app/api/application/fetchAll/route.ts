import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/lib/connect";
import Application from '@/models/Application';
import { useAuth } from '@clerk/nextjs';

connect();

export async function GET(req: NextRequest) {
  try {
    const { userId } = useAuth(); // Assuming you have isAdmin or role information

   

    const applications = await Application.find().populate('brandId userId'); // Populate as needed
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Error fetching applications.' }, { status: 500 });
  }
}
