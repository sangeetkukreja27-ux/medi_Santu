import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, subject, message } = body;

    // Validate fields
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required contact details" },
        { status: 400 }
      );
    }

    const contactId = `TMS-MSG-${Date.now().toString().slice(-4)}-${Math.floor(10 + Math.random() * 90)}`;

    // Log message details to Node.js backend stdout/logs
    console.log("==================================================");
    console.log(`[NEW CONTACT MESSAGE DETECTED] ID: ${contactId}`);
    console.log("--------------------------------------------------");
    console.log(`- From: ${fullName}`);
    console.log(`- Email: ${email}`);
    console.log(`- Company / Pharmacy: ${company || "N/A"}`);
    console.log(`- Subject: ${subject}`);
    console.log("Message Content:");
    console.log(message);
    console.log("==================================================");

    // Simulate notification triggers here (e.g. email alert to clinical team)

    return NextResponse.json({
      success: true,
      contactId,
      message: "Message successfully received on backend. Support team notified."
    });
  } catch (error) {
    console.error("Backend error parsing contact message:", error);
    return NextResponse.json(
      { success: false, error: "Internal Support Server Error" },
      { status: 500 }
    );
  }
}
