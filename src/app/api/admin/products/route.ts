import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/products.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, substance, category, price, brand, composition, packaging, shelfLife, description, inStock, image } = body;

    // Validate fields
    if (!name || !substance || !category || !price || !brand || !composition || !packaging || !shelfLife || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required product catalog details" },
        { status: 400 }
      );
    }

    // Slugify name to generate unique ID: e.g. "Iverheal 12 Tablet" -> "iverheal-12-tablet"
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct = {
      id: slug,
      name,
      substance,
      category,
      categoryKey: category.toLowerCase().replace(/\s+/g, "-"),
      price: Number(price),
      unit: packaging,
      rating: 5.0, // default new rating
      reviewsCount: 0, // default reviews
      manufacturer: brand,
      composition,
      packaging,
      shelfLife,
      description,
      benefits: `Clinical-grade authenticated sourcing for ${name}. High efficacy compliance standard profile.`,
      sideEffects: "Consult prescribing physician for comprehensive local warning profile.",
      howToUse: "Take strictly as scheduled by clinical practitioners.",
      shippingReturns: "Temperature stable logistics and secure tracked shipping standard.",
      image: image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
      thumbnails: [image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=60"],
      badges: ["New Sourced"],
      inStock: inStock !== undefined ? inStock : true,
      brand,
      form: packaging.toLowerCase().includes("cream") ? "Cream" : packaging.toLowerCase().includes("lotion") ? "Lotion" : packaging.toLowerCase().includes("injection") ? "Injection" : packaging.toLowerCase().includes("capsule") ? "Capsule" : "Tablet"
    };

    // Load existing database
    let productsList = [];
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      productsList = JSON.parse(data);
    } catch (e) {
      console.warn("products.json database empty or not found, seeding fresh...");
    }

    // Check if ID already exists
    if (productsList.some((p: any) => p.id === slug)) {
      return NextResponse.json(
        { success: false, error: "Product name already exists in catalog" },
        { status: 400 }
      );
    }

    // Append new product
    productsList.unshift(newProduct);

    // Save database
    await fs.writeFile(dbPath, JSON.stringify(productsList, null, 2), "utf-8");

    // Log details
    console.log(`[NEW MEDICINE DYNAMICALLY ADDED TO CATALOG] ID: ${slug}`);

    return NextResponse.json({
      success: true,
      productId: slug,
      message: "Product successfully cataloged in dynamic database."
    });
  } catch (error) {
    console.error("Backend error adding product:", error);
    return NextResponse.json(
      { success: false, error: "Internal Sourcing Server Error" },
      { status: 500 }
    );
  }
}
