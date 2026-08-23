import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/cms.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "CMS file not found" }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, "utf-8");
    const cms = JSON.parse(fileData);
    
    return NextResponse.json({ success: true, settings: cms.homepage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
