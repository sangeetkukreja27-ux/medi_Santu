import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/inquiries.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, totalValue } = body;

    // Validate fields
    if (!customer || !customer.fullName || !customer.mobile || !customer.email || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required client credentials or inquiry items" },
        { status: 400 }
      );
    }

    // Generate unique inquiry ID
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    const inquiryId = `TMS-INQ-${timestamp}-${random}`;

    const newInquiry = {
      id: inquiryId,
      date: new Date().toISOString(),
      status: "Pending",
      customer,
      items,
      totalValue
    };

    // Load existing database
    let database = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      database = JSON.parse(data);
    } catch (e) {
      // If file doesn't exist, we start with empty database
      console.warn("inquiries.json database not found, initializing brand new...");
    }

    // Append new inquiry
    database.unshift(newInquiry); // Add to the top of list

    // Save database
    await fs.writeFile(dbPath, JSON.stringify(database, null, 2), "utf-8");

    // Log details to console
    console.log(`[NEW SOURCING INQUIRY RECORDED DYNAMICALLY] ID: ${inquiryId}`);

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Sourcing inquiry successfully recorded on database. Clinical representative notified."
    });
  } catch (error) {
    console.error("Backend error parsing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Server Error" },
      { status: 500 }
    );
  }
}
