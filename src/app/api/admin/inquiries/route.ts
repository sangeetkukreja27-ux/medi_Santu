import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/inquiries.json");

export async function GET() {
  try {
    let database = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      database = JSON.parse(data);
    } catch (e) {
      console.warn("inquiries.json database empty or not found on GET request.");
    }

    return NextResponse.json({
      success: true,
      inquiries: database
    });
  } catch (error) {
    console.error("Backend error reading admin inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Server Error" },
      { status: 500 }
    );
  }
}
