import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function GET() {
  try {
    let productsList = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      productsList = JSON.parse(data);
    } catch (e) {
      console.warn("products.json database empty or not found on GET request.");
    }

    return NextResponse.json({
      success: true,
      products: productsList
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      }
    });
  } catch (error) {
    console.error("Backend error reading products catalog:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Catalog Error" },
      { status: 500 }
    );
  }
}
