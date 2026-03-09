import type { Brand, BoatModel, HullColor, EquipmentOption, Trailer, InventoryItem } from "@/types/database";

// ─── BRANDS ────────────────────────────────────────────────────────────────
export const brands: Brand[] = [
  {
    id: "stumpnocker",
    name: "Stumpnocker",
    slug: "stumpnocker",
    tagline: "Built for Shallow Water",
    description:
      "Stumpnocker skiffs are purpose-built for shallow-water fishing. Lightweight, durable, and fully customizable with your choice of equipment, motor, and trailer. Every hull is hand-laid fiberglass with a 10-year warranty.",
    logoUrl: "/images/logos/stumpnocker-logo.png",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b02819cfef512025a588_relume-570809.jpeg",
    isPackageBrand: false,
  },
  {
    id: "palmetto-bay",
    name: "Palmetto Bay Boats",
    slug: "palmetto-bay",
    tagline: "All-In Bay Boat Packages",
    description:
      "Palmetto Bay boats come as complete, ready-to-fish packages. Motor, trailer, and all equipment included — just pick your color and hit the water. No hidden costs, no add-ons needed.",
    logoUrl: "/images/logos/palmetto-bay-logo.png",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    isPackageBrand: true,
  },
  {
    id: "salty-skiffs",
    name: "Salty Skiffs",
    slug: "salty-skiffs",
    tagline: "Simple. Affordable. Ready to Fish.",
    description:
      "Salty Skiffs are compact, affordable fishing skiffs delivered as complete packages. Motor, trailer, and everything you need — included in one straightforward price.",
    logoUrl: "/images/logos/salty-skiffs-logo.png",
    heroImageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b84ce5c1e21665aa3b73_relume-571026.jpeg",
    isPackageBrand: true,
  },
];

// ─── BOAT MODELS (updated per Dean meeting) ────────────────────────────────
export const boatModels: BoatModel[] = [
  // Stumpnocker — 3 active boats
  {
    id: "stumpnocker-144-skiff-tiller",
    brandSlug: "stumpnocker",
    modelName: "144 Skiff Tiller",
    slug: "144-skiff-tiller",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b02819cfef512025a588_relume-570809.jpeg",
    galleryImages: [],
    basePrice: 5990,
    specs: {
      length: '14\'2"',
      beam: '61"',
      transomHeight: '20"',
      boatWeightApprox: "460 lbs",
      maxPersonsOrWeight: "3 or 500 lbs",
      maxWeight: "850 lbs",
      maxHP: "25",
      draft: '3"–6"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 144 Skiff Tiller is our most compact Stumpnocker — perfect for skinny water and tight creeks. At just 14 feet, it's easy to trailer, launch, and maneuver into spots bigger boats can't reach.",
    features: [
      "Hand-laid fiberglass hull",
      "Self-bailing deck",
      "Integrated rod holders",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "stumpnocker-164-skiff-tiller",
    brandSlug: "stumpnocker",
    modelName: "164 Skiff Tiller",
    slug: "164-skiff-tiller",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920ae5add96ece37b4eae32_relume-570454.jpeg",
    galleryImages: [],
    basePrice: 6990,
    specs: {
      length: '16\'4"',
      beam: '68"',
      transomHeight: '20"',
      boatWeightApprox: "550 lbs",
      maxPersonsOrWeight: "4 or 650 lbs",
      maxWeight: "1050 lbs",
      maxHP: "40",
      draft: '4"–7"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 164 Skiff Tiller offers the perfect balance of size and shallow-water capability. More room for gear and passengers while still running skinny.",
    features: [
      "Hand-laid fiberglass hull",
      "Self-bailing deck",
      "Integrated rod holders",
      "Wider beam for stability",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "stumpnocker-174-skiff-tiller",
    brandSlug: "stumpnocker",
    modelName: "174 Skiff Tiller",
    slug: "174-skiff-tiller",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b8740d7c8a8d98e08902_relume-573164.jpeg",
    galleryImages: [],
    basePrice: 10990,
    specs: {
      length: '17\'4"',
      beam: '74"',
      transomHeight: '20"',
      boatWeightApprox: "650 lbs",
      maxPersonsOrWeight: "5 or 800 lbs",
      maxWeight: "1250 lbs",
      maxHP: "50",
      draft: '5"–8"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "Our largest Stumpnocker tiller skiff. The 174 delivers serious shallow-water performance with room for the whole crew. Perfect for backwater flats fishing.",
    features: [
      "Hand-laid fiberglass hull",
      "Self-bailing deck",
      "Integrated rod holders",
      "Spacious casting deck",
      "74-inch beam for maximum stability",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "stumpnocker-174-skiff-tiller-deluxe",
    brandSlug: "stumpnocker",
    modelName: "174 Skiff Tiller Deluxe",
    slug: "174-skiff-tiller-deluxe",
    imageUrl: "/174-cc-deluxe.png",
    galleryImages: [],
    basePrice: 10990,
    specs: {
      length: '17\'4"',
      beam: '74"',
      transomHeight: '20"',
      boatWeightApprox: "650 lbs",
      maxPersonsOrWeight: "5 or 800 lbs",
      maxWeight: "1250 lbs",
      maxHP: "50",
      draft: '5"–8"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "Our largest Stumpnocker tiller skiff. The 174 delivers serious shallow-water performance with room for the whole crew. Perfect for backwater flats fishing.",
    features: [
      "Hand-laid fiberglass hull",
      "Self-bailing deck",
      "Integrated rod holders",
      "Spacious casting deck",
      "74-inch beam for maximum stability",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "stumpnocker-174-skiff-cc",
    brandSlug: "stumpnocker",
    modelName: "174 Skiff CC",
    slug: "174-skiff-cc",
    imageUrl: "/174skiff-cc.jpg",
    galleryImages: [],
    basePrice: 16990,
    specs: {
      length: '17\'2"',
      beam: '72"',
      transomHeight: '20"',
      boatWeightApprox: "700 lbs",
      maxPersonsOrWeight: "4 or 800 lbs",
      maxWeight: "1130 lbs",
      maxHP: "60",
      draft: '3"–6"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 174 Skiff CC brings center console versatility to Stumpnocker's shallow-water lineup. Features a fiberglass console with windshield, stainless steel steering wheel, electric switch panel, nav lights, automatic bilge pump, and plumbed live well — all standard.",
    features: [
      "Fiberglass center console with windshield",
      "Stainless steel steering wheel & grabrails",
      "Electric switch panel & nav lights included",
      "Automatic bilge pump included",
      "Plumbed live well with water pick-up",
      "Bow casting platform & stern casting deck",
      "Flip-flop cooler seat",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  // Palmetto Bay — 2 active boats (all-in packages)
  {
    id: "palmetto-186-bay",
    brandSlug: "palmetto-bay",
    modelName: "186 Bay",
    slug: "186-bay",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    galleryImages: [],
    basePrice: 36990,
    specs: {
      length: '18\'6"',
      beam: '82"',
      transomHeight: '25"',
      boatWeightApprox: "850 lbs",
      maxPersonsOrWeight: "6 or 950 lbs",
      maxWeight: "1600 lbs",
      maxHP: "140",
      draft: '5"–9"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 186 Bay is a versatile bay boat ready for anything — inshore flats, open bays, or coastal runs. Comes as a complete package with motor, trailer, and all equipment included.",
    features: [
      "Complete package — motor & trailer included",
      "Any hull color included at no extra charge",
      "Available with 115 HP or 140 HP motor",
      "Full electronics package",
      "Live well system",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "palmetto-1701-cc",
    brandSlug: "palmetto-bay",
    modelName: "1701 CC",
    slug: "1701-cc",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    galleryImages: [],
    basePrice: 32990,
    specs: {
      length: '17\'0"',
      beam: '76"',
      transomHeight: '20"',
      boatWeightApprox: "700 lbs",
      maxPersonsOrWeight: "5 or 825 lbs",
      maxWeight: "1300 lbs",
      maxHP: "90",
      draft: '5"–8"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 1701 CC center console is a compact, capable bay boat that comes ready to fish. Complete package includes 90 HP motor, trailer, and all equipment.",
    features: [
      "Complete package — motor & trailer included",
      "Any hull color included at no extra charge",
      "90 HP motor included",
      "Center console layout",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  // Salty Skiffs — 2 active boats (all-in packages)
  {
    id: "salty-skiffs-14-s",
    brandSlug: "salty-skiffs",
    modelName: "14 S",
    slug: "14-s",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b84ce5c1e21665aa3b73_relume-571026.jpeg",
    galleryImages: [],
    basePrice: 6000,
    specs: {
      length: '14\'0"',
      beam: '60"',
      transomHeight: '20"',
      boatWeightApprox: "480 lbs",
      maxPersonsOrWeight: "3 or 525 lbs",
      maxWeight: "875 lbs",
      maxHP: "30",
      draft: '3"–6"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 14 S (Standard) is the most affordable way to get on the water. A complete fishing skiff package with motor and trailer included.",
    features: [
      "Complete package — motor & trailer included",
      "Any hull color included at no extra charge",
      "Lightweight and easy to trailer",
      "10-year hull warranty",
    ],
    isActive: true,
  },
  {
    id: "salty-skiffs-14-f",
    brandSlug: "salty-skiffs",
    modelName: "14 F",
    slug: "14-f",
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b84d44168c818a89331d_relume-571027.jpeg",
    galleryImages: [],
    basePrice: 10500,
    specs: {
      length: '14\'0"',
      beam: '60"',
      transomHeight: '20"',
      boatWeightApprox: "500 lbs",
      maxPersonsOrWeight: "3 or 525 lbs",
      maxWeight: "875 lbs",
      maxHP: "30",
      draft: '3"–6"',
      hullWarrantyYears: 10,
    },
    standardColors: ["White", "Gray"],
    description:
      "The 14 F (Fish) is the angler-focused Salty Skiff. Enhanced fishing features in a complete package with motor and trailer included.",
    features: [
      "Complete package — motor & trailer included",
      "Any hull color included at no extra charge",
      "Enhanced fishing layout",
      "GTA 1615 aluminum trailer included",
      "10-year hull warranty",
    ],
    isActive: true,
  },
];

// ─── HULL COLORS ────────────────────────────────────────────────────────────
export const hullColors: HullColor[] = [
  { id: "white", colorName: "White", hexCode: "#FFFFFF", isStandard: true },
  { id: "gray", colorName: "Gray", hexCode: "#9CA3AF", isStandard: true },
  { id: "fighting-lady-yellow", colorName: "Fighting Lady Yellow", hexCode: "#FFD700", isStandard: false },
  { id: "lt-blue", colorName: "Lt. Blue", hexCode: "#87CEEB", isStandard: false },
  { id: "aqua", colorName: "Aqua", hexCode: "#00CED1", isStandard: false },
  { id: "dark-blue", colorName: "Dark Blue", hexCode: "#003366", isStandard: false },
  { id: "red", colorName: "Red", hexCode: "#DC2626", isStandard: false },
  { id: "sea-foam", colorName: "Sea Foam", hexCode: "#98D8C8", isStandard: false },
];

// Color pricing per Stumpnocker model size (Dean meeting)
// Palmetto Bay & Salty Skiffs: colors are FREE (included in package)
export function getColorPrice(modelId: string, colorId: string): number {
  const color = hullColors.find((c) => c.id === colorId);
  if (!color || color.isStandard) return 0;

  if (modelId.includes("144")) return 550;
  if (modelId.includes("164")) return 650;
  if (modelId.includes("174")) return 750;

  // Package brands — free
  return 0;
}

// ─── EQUIPMENT OPTIONS (Stumpnocker only, updated per Dean) ────────────────
export const equipmentOptions: EquipmentOption[] = [
  // ELECTRICAL (section 1 — first)
  {
    id: "switch-panel-12v-prewire",
    optionName: "Switch Panel — 12V Prewire with Plugs + 12V Battery Tray",
    description: "Complete 12-volt switch panel pre-wire with plugs and battery tray. Powers accessories like navigation lights, bilge pump, and live well.",
    price: 389,
    category: "electrical",
    sortOrder: 0,
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  // TROLLING MOTOR (section between electrical and plumbing)
  {
    id: "switch-panel-12v",
    optionName: "12v Trolling Motor Prewire",
    description: "Complete 12-volt trolling motor pre-wire setup and battery tray.",
    price: 389,
    category: "trolling-motor",
    sortOrder: 5,
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  {
    id: "switch-panel-24v",
    optionName: "24v Trolling Motor Prewire",
    description: "Heavy-duty 24-volt setup with dual battery trays for maximum power.",
    price: 389,
    category: "trolling-motor",
    sortOrder: 6,
    applicableModelIds: [],
  },
  {
    id: "nav-lights",
    optionName: "Navigation Lights",
    description: "Required for operation between sunset and sunrise. Requires switch panel.",
    price: 289,
    category: "electrical",
    sortOrder: 3,
    requiresOptionId: "switch-panel-12v-prewire",
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  {
    id: "bilge-pump-12v",
    optionName: "Bilge Pump — Automatic (12V)",
    description: "Automatic bilge pump for 12-volt systems. Requires switch panel.",
    price: 240,
    category: "electrical",
    sortOrder: 4,
    requiresOptionId: "switch-panel-12v-prewire",
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  {
    id: "bilge-pump-24v",
    optionName: "Bilge Pump — Automatic (24V)",
    description: "Automatic bilge pump for 24-volt systems. Requires switch panel.",
    price: 245,
    category: "electrical",
    sortOrder: 5,
    requiresOptionId: "switch-panel-12v-prewire",
    applicableModelIds: [],
  },
  // PLUMBING (section 2 — second)
  {
    id: "live-well-kit",
    optionName: "Live Well Kit",
    description: "Complete kit includes live well box, plumbing, and pump. Requires switch panel.",
    price: 790,
    category: "plumbing",
    sortOrder: 10,
    requiresOptionId: "switch-panel-12v-prewire",
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  // SEATING (keep for now — pending from Dean)
  {
    id: "folding-fishing-seat",
    optionName: "Folding Fishing Seat with F/G Seat Box / Bow Floor",
    description: "Comfortable folding seat with integrated fiberglass seat box.",
    price: 185,
    category: "seating",
    sortOrder: 20,
    applicableModelIds: [],
  },
  {
    id: "rear-bench-exchange",
    optionName: "Exchange Rear Bench for Seat Box with Folding Seat and Swivel",
    description: "Replace standard rear bench with upgraded seat box and swivel seat.",
    price: 245,
    category: "seating",
    sortOrder: 21,
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  {
    id: "base-plate-seat",
    optionName: '7x7 Base Plate / 13" Post / Post Clips and Folding Seat (White)',
    description: "Installed on bow hatch for an elevated fishing position.",
    price: 189,
    category: "seating",
    sortOrder: 22,
    applicableModelIds: ["stumpnocker-144-skiff-tiller", "stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
];

// ─── TRAILERS ────────────────────────────────────────────────────────────────
export const trailers: Trailer[] = [
  {
    id: "continental-ec312",
    trailerName: "Continental Model EC312 Trailer",
    description:
      'Galvanized, Side guides w/ PVC covers, tongue jack, hubs, 2" coupler, bow bunk board, 12" tires, bow safety chain.',
    price: 890,
    applicableModelIds: ["stumpnocker-144-skiff-tiller"],
  },
  {
    id: "continental-gta1615",
    trailerName: "Continental Model GTA1615",
    description:
      "Aluminum / Alum Side Guides w/ PVC Covers / Tongue Jack / Galv Hubs / 2 Inch Coupler / Bow Bunk Board / 12b Tires / Bow Safety Chain.",
    price: 1990,
    applicableModelIds: ["stumpnocker-164-skiff-tiller", "stumpnocker-174-skiff-tiller", "stumpnocker-174-skiff-tiller-deluxe", "stumpnocker-174-skiff-cc"],
  },
  {
    id: "gta-1615",
    trailerName: "GTA 1615-1500 Aluminum Trailer",
    description: "Lightweight aluminum trailer designed for small skiffs.",
    price: 1995,
    applicableModelIds: ["salty-skiffs-14-f", "salty-skiffs-14-s"],
  },
];

// ─── INVENTORY (on-hand boats ready to purchase) ─────────────────────────────
export const inventoryItems: InventoryItem[] = [
  {
    id: "inv-stump-144-white-01",
    boatModelId: "stumpnocker-144-skiff-tiller",
    title: "2025 Stumpnocker 144 — White",
    description:
      "Brand new Stumpnocker 144 Skiff Tiller in classic white. Hull only — add your own motor, trailer, and equipment. Ready for immediate pickup.",
    price: 5990,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b02819cfef512025a588_relume-570809.jpeg",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "None",
    trailerIncluded: "None",
    hullColor: "White",
    isSold: false,
  },
  {
    id: "inv-stump-164-aqua-01",
    boatModelId: "stumpnocker-164-skiff-tiller",
    title: "2025 Stumpnocker 164 — Aqua",
    description:
      "New Stumpnocker 164 Skiff Tiller in Aqua with nav lights and switch panel pre-installed. Hull only.",
    price: 7906,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b8740d7c8a8d98e08902_relume-573164.jpeg",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "None",
    trailerIncluded: "None",
    hullColor: "Aqua",
    isSold: false,
  },
  {
    id: "inv-stump-174-seafoam-01",
    boatModelId: "stumpnocker-174-skiff-tiller",
    title: "2025 Stumpnocker 174 — Sea Foam",
    description:
      "Our flagship Stumpnocker 174 in Sea Foam green. Fully loaded with 24V switch panel, nav lights, bilge pump, and live well kit. Hull only.",
    price: 12304,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920ae5add96ece37b4eae32_relume-570454.jpeg",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "None",
    trailerIncluded: "None",
    hullColor: "Sea Foam",
    isSold: false,
  },
  {
    id: "inv-palmetto-186-white-01",
    boatModelId: "palmetto-186-bay",
    title: "2025 Palmetto Bay 186 Bay — White w/ 115HP Yamaha",
    description:
      "Complete package: Palmetto Bay 186 in white with Yamaha 115HP four-stroke, aluminum trailer, full electronics, and live well. Ready to fish.",
    price: 36990,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "Yamaha 115 HP",
    trailerIncluded: "Aluminum trailer included",
    hullColor: "White",
    isSold: false,
  },
  {
    id: "inv-palmetto-186-blue-01",
    boatModelId: "palmetto-186-bay",
    title: "2025 Palmetto Bay 186 Bay — Dark Blue w/ 140HP Suzuki",
    description:
      "Complete package: Palmetto Bay 186 in Dark Blue with Suzuki 140HP four-stroke, aluminum trailer, and all equipment.",
    price: 39990,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "Suzuki 140 HP",
    trailerIncluded: "Aluminum trailer included",
    hullColor: "Dark Blue",
    isSold: false,
  },
  {
    id: "inv-palmetto-1701-gray-01",
    boatModelId: "palmetto-1701-cc",
    title: "2025 Palmetto Bay 1701 CC — Gray w/ 90HP Yamaha",
    description:
      "Complete center console package: Palmetto Bay 1701 CC in Gray with Yamaha 90HP four-stroke, trailer, and all equipment.",
    price: 32990,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b857ac4ab035bea690d0_relume-572947.png",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "Yamaha 90 HP",
    trailerIncluded: "Aluminum trailer included",
    hullColor: "Gray",
    isSold: false,
  },
  {
    id: "inv-salty-14s-white-01",
    boatModelId: "salty-skiffs-14-s",
    title: "2025 Salty Skiffs 14 S — White",
    description:
      "Complete package: Salty Skiffs 14 Standard in white with motor and trailer. The most affordable way to get on the water.",
    price: 6000,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b84ce5c1e21665aa3b73_relume-571026.jpeg",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "Motor included",
    trailerIncluded: "GTA 1615 aluminum trailer included",
    hullColor: "White",
    isSold: false,
  },
  {
    id: "inv-salty-14f-yellow-01",
    boatModelId: "salty-skiffs-14-f",
    title: "2025 Salty Skiffs 14 F — Fighting Lady Yellow",
    description:
      "Complete fishing package: Salty Skiffs 14 Fish in Fighting Lady Yellow with motor and trailer. Enhanced fishing layout.",
    price: 10500,
    imageUrl:
      "https://cdn.prod.website-files.com/6920ad7dcb93ec99176de89c/6920b84d44168c818a89331d_relume-571027.jpeg",
    galleryImages: [],
    year: 2025,
    condition: "new",
    motorIncluded: "Motor included",
    trailerIncluded: "GTA 1615 aluminum trailer included",
    hullColor: "Fighting Lady Yellow",
    isSold: false,
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getModelsByBrand(brandSlug: string): BoatModel[] {
  return boatModels.filter((m) => m.brandSlug === brandSlug && m.isActive);
}

export function getModelBySlug(brandSlug: string, modelSlug: string): BoatModel | undefined {
  return boatModels.find((m) => m.brandSlug === brandSlug && m.slug === modelSlug && m.isActive);
}

export function getEquipmentForModel(modelId: string): EquipmentOption[] {
  return equipmentOptions
    .filter((e) => e.applicableModelIds.includes(modelId))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTrailersForModel(modelId: string): Trailer[] {
  return trailers.filter((t) => t.applicableModelIds.includes(modelId));
}

export function getAvailableInventory(): InventoryItem[] {
  return inventoryItems.filter((item) => !item.isSold);
}

export function getInventoryItem(id: string): InventoryItem | undefined {
  return inventoryItems.find((item) => item.id === id);
}

export function slugifyInventory(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
