import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/cms.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "CMS settings file not found" }, { status: 404 });
    }
    
    const fileData = fs.readFileSync(filePath, "utf-8");
    const cms = JSON.parse(fileData);
    
    return NextResponse.json({ 
      success: true, 
      cms, 
      settings: cms.homepage, 
      about: cms.about, 
      contact: cms.contact 
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
