const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '..', 'src/data/products.json');
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {}

const relatedItems = [
  {
    id: "rel-1",
    name: "Ivermectin 12mg",
    substance: "Ivermectin",
    category: "Antiparasitic",
    categoryKey: "antiparasitic",
    price: 18.0,
    unit: "10 Tablets",
    rating: 5.0,
    reviewsCount: 48,
    manufacturer: "Healing Pharma",
    composition: "Ivermectin 12mg",
    packaging: "10 Tablets in 1 Strip",
    shelfLife: "24 Months",
    description: "Ivermectin 12mg is a broad-spectrum antiparasitic medication used to treat various intestinal and skin parasitic infections with high clinical efficacy.",
    benefits: "Rapid clearance of parasites and high tolerance profile in global healthcare applications.",
    sideEffects: "Mild dizziness or stomach irritation.",
    howToUse: "Take once on an empty stomach with a full glass of water.",
    shippingReturns: "Global express shipping with tracking.",
    image: "/images/products/related-ivermectin.jpg",
    thumbnails: ["/images/products/related-ivermectin.jpg"],
    badges: ["Popular"],
    inStock: true,
    brand: "Healing Pharma",
    form: "Tablet"
  },
  {
    id: "rel-2",
    name: "Albendazole 400mg",
    substance: "Albendazole",
    category: "Antiparasitic",
    categoryKey: "antiparasitic",
    price: 12.0,
    unit: "10 Tablets",
    rating: 5.0,
    reviewsCount: 35,
    manufacturer: "Cipla / Generic",
    composition: "Albendazole 400mg",
    packaging: "10 Tablets Box",
    shelfLife: "36 Months",
    description: "Albendazole 400mg is an anthelmintic medication that prevents newly hatched insect larvae from growing or multiplying in the human body.",
    benefits: "Effective treatment against tapeworms, pinworms, and roundworms.",
    sideEffects: "Nausea, temporary abdominal cramps.",
    howToUse: "Chew or swallow with meals as advised by medical professional.",
    shippingReturns: "Shipped in discreet protective packaging.",
    image: "/images/products/related-albendazole.jpg",
    thumbnails: ["/images/products/related-albendazole.jpg"],
    badges: ["Antiparasitic"],
    inStock: true,
    brand: "Cipla",
    form: "Tablet"
  },
  {
    id: "rel-3",
    name: "Mebendazole 100mg",
    substance: "Mebendazole",
    category: "Antiparasitic",
    categoryKey: "antiparasitic",
    price: 14.0,
    unit: "10 Tablets",
    rating: 4.9,
    reviewsCount: 29,
    manufacturer: "Janssen / Generic",
    composition: "Mebendazole 100mg",
    packaging: "10 Tablets Box",
    shelfLife: "36 Months",
    description: "Mebendazole 100mg is used to treat infections caused by worms such as whipworm, pinworm, roundworm, and hookworm.",
    benefits: "Blocks glucose uptake in parasites, causing clearance without systemic toxicity.",
    sideEffects: "Occasional mild bloating or diarrhea.",
    howToUse: "Can be chewed, swallowed whole, or crushed and mixed with food.",
    shippingReturns: "Direct tracked export parcel.",
    image: "/images/products/related-mebendazole.jpg",
    thumbnails: ["/images/products/related-mebendazole.jpg"],
    badges: ["Antiparasitic"],
    inStock: true,
    brand: "Janssen / Generic",
    form: "Tablet"
  },
  {
    id: "rel-4",
    name: "Praziquantel 600mg",
    substance: "Praziquantel",
    category: "Antiparasitic",
    categoryKey: "antiparasitic",
    price: 32.0,
    unit: "6 Tablets",
    rating: 5.0,
    reviewsCount: 19,
    manufacturer: "Bayer / Generic",
    composition: "Praziquantel 600mg",
    packaging: "6 Tablets in 1 Strip",
    shelfLife: "24 Months",
    description: "Praziquantel 600mg is an anthelmintic medication used for the treatment of infections caused by Schistosoma and liver flukes.",
    benefits: "High potency and rapid parasitic clearance in clinical schistosomiasis.",
    sideEffects: "Drowsiness, headache, or malaise.",
    howToUse: "Take tablets unchewed with water during meals.",
    shippingReturns: "Fast delivery to 107+ countries.",
    image: "/images/products/related-praziquantel.jpg",
    thumbnails: ["/images/products/related-praziquantel.jpg"],
    badges: ["Antiparasitic"],
    inStock: true,
    brand: "Bayer / Generic",
    form: "Tablet"
  }
];

const map = new Map();
existing.forEach(p => map.set(p.id, p));
relatedItems.forEach(p => map.set(p.id, p));

const merged = Array.from(map.values());
fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`products.json updated with related products! Total: ${merged.length}`);
