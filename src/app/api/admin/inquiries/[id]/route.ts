import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/inquiries.json");

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();
    const { id } = await params;

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Missing new status" },
        { status: 400 }
      );
    }

    let database = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      database = JSON.parse(data);
    } catch (e) {
      return NextResponse.json({ success: false, error: "Database empty" }, { status: 404 });
    }

    // Find and update
    let updated = false;
    database = database.map((inq: any) => {
      if (inq.id === id) {
        updated = true;
        return { ...inq, status };
      }
      return inq;
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Inquiry ID not found" }, { status: 404 });
    }

    await fs.writeFile(dbPath, JSON.stringify(database, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Backend error updating inquiry status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let database = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      database = JSON.parse(data);
    } catch (e) {
      return NextResponse.json({ success: false, error: "Database empty" }, { status: 404 });
    }

    const filtered = database.filter((inq: any) => inq.id !== id);

    if (filtered.length === database.length) {
      return NextResponse.json({ success: false, error: "Inquiry ID not found" }, { status: 404 });
    }

    await fs.writeFile(dbPath, JSON.stringify(filtered, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully from backend" });
  } catch (error) {
    console.error("Backend error deleting inquiry:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
