import { connect } from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";
import Brand from "@/models/post"; // Your Brand model

 connect();

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    

    // Parse the incoming request data
    const data = await request.json();
    console.log(data);

    // Create a new brand object with the data from the request, including imageUrl
    const newBrand = new Brand({
      name: data.name,
      description: data.description,
      moneyOffered: data.moneyOffered,
      sponsorshipAvailable: data.sponsorshipAvailable ?? true, // Default true if not provided
      imageUrl: data.imageUrl, // Make sure this is passed in the request
      status: data.status ?? 'waiting', // Default 'waiting' if not provided
    });

    // Save the new brand to the database
    await newBrand.save();

    return NextResponse.json(
      {
        message: "Brand created successfully!",
        brand: newBrand,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      { status: 500 }
    );
  }
}