export interface ConfiguratorState {
  step: number;
  brandSlug: string | null;
  modelId: string | null;
  hullColorId: string | null;
  selectedEquipmentIds: string[];
  trailerId: string | null;
  motorOption: "select" | "own" | null;
  motorId: string | null;
  installationOption: "yes" | "no" | null;
  deliveryType: "pickup" | "delivery" | null;
  deliveryAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export type ConfiguratorAction =
  | { type: "SET_BRAND"; payload: string }
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_COLOR"; payload: string }
  | { type: "TOGGLE_EQUIPMENT"; payload: string }
  | { type: "SET_TRAILER"; payload: string | null }
  | { type: "SET_MOTOR_OPTION"; payload: "select" | "own" }
  | { type: "SET_MOTOR"; payload: string | null }
  | { type: "SET_INSTALLATION"; payload: "yes" | "no" }
  | { type: "SET_DELIVERY_TYPE"; payload: "pickup" | "delivery" }
  | { type: "SET_DELIVERY_ADDRESS"; payload: string }
  | { type: "SET_CUSTOMER_NAME"; payload: string }
  | { type: "SET_CUSTOMER_EMAIL"; payload: string }
  | { type: "SET_CUSTOMER_PHONE"; payload: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "RESET" };

// Steps vary by brand
export const STUMPNOCKER_STEPS = [
  "Brand",
  "Boat",
  "Color",
  "Equipment",
  "Trailer",
  "Motor",
  "Installation",
  "Delivery",
  "Review",
] as const;

export const SALTY_SKIFFS_STEPS = [
  "Brand",
  "Boat",
  "Color",
  "Trailer",
  "Motor",
  "Installation",
  "Delivery",
  "Review",
] as const;

export const PACKAGE_STEPS = [
  "Brand",
  "Boat",
  "Color",
  "Motor",
  "Trailer",
  "Delivery",
  "Review",
] as const;

export type StepName = (typeof STUMPNOCKER_STEPS)[number] | (typeof PACKAGE_STEPS)[number] | (typeof SALTY_SKIFFS_STEPS)[number];
