import { connect } from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";
import Brand from "@/models/post"; // Your Brand model

// Connect to the database
connect();

// Define the GET handler to fetch all brands
export async function GET(request: NextRequest) {
  try {
    // Fetch all brands from the database
    const brands = await Brand.find();

    // Return the list of brands
    return NextResponse.json(
      {
        message: "Brands fetched successfully",
        brands: brands,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      { status: 500 }
    );
  }
}
