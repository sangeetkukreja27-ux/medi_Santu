import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), "src/data/cms.json");
    
    let cms = { homepage: {}, about: {}, contact: {} };
    if (fs.existsSync(filePath)) {
      cms = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    
    cms.homepage = {
      ...cms.homepage,
      ...body
    };
    
    fs.writeFileSync(filePath, JSON.stringify(cms, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, settings: cms.homepage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
