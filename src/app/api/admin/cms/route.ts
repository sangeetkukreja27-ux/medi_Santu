import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, data } = body;
    
    if (!section || !data) {
      return NextResponse.json({ success: false, error: "Section and data are required" }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), "src/data/cms.json");
    let currentCms = { homepage: {}, about: {}, contact: {} };
    
    if (fs.existsSync(filePath)) {
      currentCms = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    
    // Merge section settings
    currentCms[section as "homepage" | "about" | "contact"] = {
      ...currentCms[section as "homepage" | "about" | "contact"],
      ...data
    };
    
    fs.writeFileSync(filePath, JSON.stringify(currentCms, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, cms: currentCms });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
