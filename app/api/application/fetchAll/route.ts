import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/lib/connect";
import Application from '@/models/Application';


connect();

export async function GET(req: NextRequest) {
  try {
   


    const applications = await Application.find().populate('brandId userId'); // Populate as needed
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {

    console.error('Error fetching applications:', error);

    return NextResponse.json({ success: false, message: 'Error fetching applications.' }, { status: 500 });
  }
}
