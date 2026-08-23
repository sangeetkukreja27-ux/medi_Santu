import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/inquiries.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Support both single item inquiry format and cart inquiry format
    const customer = body.customer || {
      fullName: body.name || "Customer",
      mobile: body.mobile || "N/A",
      email: body.email || "N/A",
      company: body.company || "",
      message: body.message || ""
    };

    let items = body.items || [];
    if (items.length === 0 && body.productId) {
      items = [{
        id: body.productId,
        name: body.productName || body.productId,
        substance: body.substance || "",
        price: body.price || 0,
        quantity: body.quantity || 1,
        total: (body.price || 0) * (body.quantity || 1)
      }];
    }

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    const inquiryId = `TMS-INQ-${timestamp}-${random}`;

    const newInquiry = {
      id: inquiryId,
      date: new Date().toISOString(),
      status: "Pending",
      customer,
      items,
      totalValue: body.totalValue || items.reduce((sum: number, item: any) => sum + (item.total || 0), 0)
    };

    let database = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      database = JSON.parse(data);
    } catch (e) {
      // file missing fallback
    }

    database.unshift(newInquiry);
    await fs.writeFile(dbPath, JSON.stringify(database, null, 2), "utf-8");

    return NextResponse.json({ success: true, inquiryId });
  } catch (error: any) {
    console.error("Error handling inquiry:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
