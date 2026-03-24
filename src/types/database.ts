export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logoUrl: string;
  heroImageUrl: string;
  isPackageBrand: boolean;
}

export interface BoatSpecs {
  length: string;
  beam: string;
  transomHeight: string;
  boatWeightApprox: string;
  maxPersonsOrWeight: string;
  maxWeight: string;
  maxHP: string;
  draft: string;
  hullWarrantyYears: number;
}

export interface BoatModel {
  id: string;
  brandSlug: string;
  modelName: string;
  slug: string;
  imageUrl: string;
  galleryImages: string[];
  basePrice: number;
  specs: BoatSpecs;
  standardColors: string[];
  description: string;
  features: string[];
  isActive: boolean;
}

export interface HullColor {
  id: string;
  colorName: string;
  hexCode: string;
  isStandard: boolean;
}

export interface ModelColorPricing {
  modelId: string;
  colorId: string;
  price: number;
}

export interface EquipmentOption {
  id: string;
  optionName: string;
  description: string;
  price: number;
  category: "electrical" | "trolling-motor" | "plumbing" | "seating" | "additional-options";
  sortOrder: number;
  requiresOptionId?: string;
  applicableModelIds: string[];
}

export interface TrailerAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Trailer {
  id: string;
  trailerName: string;
  description: string;
  price: number;
  applicableModelIds: string[];
  addOns?: TrailerAddOn[];
}

export interface Motor {
  id: string;
  motorName: string;
  brand: string;
  horsepower: number;
  price: number;
  applicableModelIds: string[];
}

export interface InventoryItem {
  id: string;
  boatModelId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  galleryImages: string[];
  year: number;
  condition: "new" | "used";
  motorIncluded: string;
  trailerIncluded: string;
  hullColor: string;
  isSold: boolean;
}

export interface BuildOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  brandSlug: string;
  modelId: string;
  hullColorId: string;
  selectedEquipment: string[];
  trailerId?: string;
  motorId?: string;
  hasOwnMotor: boolean;
  deliveryType: "pickup" | "delivery";
  deliveryAddress?: string;
  basePrice: number;
  colorPrice: number;
  equipmentTotal: number;
  trailerPrice: number;
  motorPrice: number;
  totalPrice: number;
  depositAmount: number;
  depositPaid: boolean;
  stripeSessionId?: string;
  status: "pending" | "deposit_paid" | "in_production" | "ready" | "delivered";
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
