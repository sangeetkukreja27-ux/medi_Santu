import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Ensure the uploads directory exists on PC
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique name: prod_[timestamp]_[safe_name]
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `prod_${timestamp}_${safeName}`;
    const destinationPath = path.join(uploadsDir, filename);

    // Write file to filesystem
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(destinationPath, buffer);

    console.log(`[LOCAL IMAGE UPLOAD SUCCESS] Saved to: ${destinationPath}`);

    // Return the relative URL to access it in Next.js public directory
    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      message: "Image uploaded successfully to local PC public folder."
    });
  } catch (error) {
    console.error("Local file upload error on backend:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Upload Error" },
      { status: 500 }
    );
  }
}
