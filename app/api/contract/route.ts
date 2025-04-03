import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { brandName, influencerName, campaignDetails, compensation, duration } = await req.json();

    const prompt = `Generate a professional influencer contract between ${brandName} and ${influencerName} for a campaign with the following details:
    
    Campaign Details: ${campaignDetails}
    Compensation: ${compensation}
    Duration: ${duration}
    
    The contract should include standard clauses for confidentiality, content approval, payment terms, and termination conditions. Format the contract in markdown.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ contract: text });
  } catch (error) {
    console.error("Error generating contract:", error);
    return NextResponse.json({ error: "Failed to generate contract" }, { status: 500 });
  }
}