import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function extractJSONFromMarkdown(text: string): string {
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
  return jsonMatch ? jsonMatch[1] : text;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`Generate a title and description for a product or service related to: ${prompt}. 
    Format the response as JSON with "title" and "description" fields. Do not include any additional text or formatting outside the JSON.`);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from potential markdown formatting
    const jsonText = extractJSONFromMarkdown(text);

    try {
      const content = JSON.parse(jsonText);
      return NextResponse.json(content);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return NextResponse.json({ error: "Invalid response format" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}