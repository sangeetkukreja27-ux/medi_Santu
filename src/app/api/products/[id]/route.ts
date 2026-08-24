import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let productsList = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      productsList = JSON.parse(data);
    } catch (e) {
      return NextResponse.json({ success: false, error: "Database empty" }, { status: 404 });
    }

    const matchedProduct = productsList.find((p: any) => p.id === id);

    if (!matchedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: matchedProduct
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      }
    });
  } catch (error) {
    console.error("Backend error reading product details:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Server Error" },
      { status: 500 }
    );
  }
}
