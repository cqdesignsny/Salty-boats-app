"use client";

import { useReducer, useCallback, useMemo } from "react";
import type { ConfiguratorState, ConfiguratorAction } from "@/types/configurator";
import { STUMPNOCKER_STEPS, SALTY_SKIFFS_STEPS, PACKAGE_STEPS } from "@/types/configurator";
import {
  getBrandBySlug,
  getModelsByBrand,
  boatModels,
  hullColors,
  getColorPrice,
  getEquipmentForModel,
  getTrailersForModel,
  equipmentOptions,
  trailers,
  packageMotorOptions,
  getPackageMotorsForModel,
} from "@/lib/data";

const initialState: ConfiguratorState = {
  step: 0,
  brandSlug: null,
  modelId: null,
  hullColorId: null,
  selectedEquipmentIds: [],
  trailerId: null,
  motorOption: null,
  motorId: null,
  installationOption: null,
  deliveryType: null,
  deliveryAddress: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
};

function reducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case "SET_BRAND":
      return {
        ...initialState,
        step: state.step,
        brandSlug: action.payload,
        // Reset downstream selections
        modelId: null,
        hullColorId: null,
        selectedEquipmentIds: [],
        trailerId: null,
        motorOption: null,
        motorId: null,
      };
    case "SET_MODEL":
      return {
        ...state,
        modelId: action.payload,
        hullColorId: null,
        selectedEquipmentIds: [],
        trailerId: null,
        motorOption: null,
        motorId: null,
      };
    case "SET_COLOR":
      return { ...state, hullColorId: action.payload };
    case "TOGGLE_EQUIPMENT": {
      const ids = state.selectedEquipmentIds;
      const exists = ids.includes(action.payload);
      return {
        ...state,
        selectedEquipmentIds: exists
          ? ids.filter((id) => id !== action.payload)
          : [...ids, action.payload],
      };
    }
    case "SET_TRAILER":
      return { ...state, trailerId: action.payload };
    case "SET_MOTOR_OPTION":
      return { ...state, motorOption: action.payload, motorId: null, installationOption: null };
    case "SET_MOTOR":
      return { ...state, motorId: action.payload };
    case "SET_INSTALLATION":
      return { ...state, installationOption: action.payload };
    case "SET_DELIVERY_TYPE":
      return { ...state, deliveryType: action.payload, deliveryAddress: action.payload === "pickup" ? "" : state.deliveryAddress };
    case "SET_DELIVERY_ADDRESS":
      return { ...state, deliveryAddress: action.payload };
    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.payload };
    case "SET_CUSTOMER_EMAIL":
      return { ...state, customerEmail: action.payload };
    case "SET_CUSTOMER_PHONE":
      return { ...state, customerPhone: action.payload };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "GO_TO_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useConfigurator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const brand = state.brandSlug ? getBrandBySlug(state.brandSlug) : null;
  const isPackageBrand = brand?.isPackageBrand ?? false;

  const isSaltySkiffs = state.brandSlug === "salty-skiffs";
  const steps = isPackageBrand ? PACKAGE_STEPS : isSaltySkiffs ? SALTY_SKIFFS_STEPS : STUMPNOCKER_STEPS;
  const currentStepName = steps[state.step] ?? "Brand";
  const totalSteps = steps.length;

  const selectedModel = state.modelId
    ? boatModels.find((m) => m.id === state.modelId) ?? null
    : null;

  const selectedColor = state.hullColorId
    ? hullColors.find((c) => c.id === state.hullColorId) ?? null
    : null;

  const colorPrice = state.modelId && state.hullColorId
    ? getColorPrice(state.modelId, state.hullColorId)
    : 0;

  const selectedEquipment = equipmentOptions.filter((e) =>
    state.selectedEquipmentIds.includes(e.id)
  );

  const equipmentTotal = selectedEquipment.reduce((sum, e) => sum + e.price, 0);

  const selectedTrailer = state.trailerId
    ? trailers.find((t) => t.id === state.trailerId) ?? null
    : null;

  const trailerPrice = selectedTrailer?.price ?? 0;

  // Package/pick-your-power motor selection
  const selectedPackageMotor = state.motorId
    ? packageMotorOptions.find((m) => m.id === state.motorId) ?? null
    : null;

  // Motor install fee ($85 if "contact for options" — Stumpnocker only)
  const motorInstallFee = !isPackageBrand && state.motorOption === "select" && state.motorId && !selectedPackageMotor ? 85 : 0;

  // Salty Skiffs motor installation fee ($250)
  const installationFee = isSaltySkiffs && state.installationOption === "yes" ? 250 : 0;

  // Pricing varies by brand type:
  // - Palmetto Bay (all-in): packagePrice includes boat + motor + trailer + equipment
  // - Salty Skiffs: base + color + trailer + motorPrice + installation
  // - Stumpnocker: base + color + equipment + trailer + motor install
  const basePrice = selectedModel?.basePrice ?? 0;
  const motorAddOn = selectedPackageMotor?.motorPrice ?? 0;
  const totalPrice = (() => {
    if (isPackageBrand && selectedPackageMotor && selectedPackageMotor.packagePrice > 0) {
      // All-in package (Palmetto Bay): packagePrice includes everything
      return selectedPackageMotor.packagePrice + colorPrice;
    }
    // Standard build: base + color + equipment + trailer + motor cost + installation
    const motorCost = selectedPackageMotor
      ? selectedPackageMotor.motorPrice  // Pick-your-power motor (Salty Skiffs)
      : motorInstallFee;                 // Stumpnocker $85 install (or $0)
    return basePrice + colorPrice + equipmentTotal + trailerPrice + motorCost + installationFee;
  })();

  const canGoNext = useCallback((): boolean => {
    switch (currentStepName) {
      case "Brand":
        return !!state.brandSlug;
      case "Boat":
        return !!state.modelId;
      case "Color":
        return !!state.hullColorId;
      case "Equipment":
        return true; // Equipment is optional
      case "Trailer":
        return true; // Trailer is optional (or display-only for package)
      case "Motor":
        if (isPackageBrand) {
          return !!state.motorId; // Palmetto Bay: must select a package motor
        }
        if (state.motorOption === "own") return true; // No motor needed
        if (state.motorOption === "select") {
          // If model has selectable motors (Salty Skiffs), must pick one
          const motors = state.modelId ? getPackageMotorsForModel(state.modelId) : [];
          if (motors.some((m) => m.motorPrice > 0)) return !!state.motorId;
          return true; // Stumpnocker: "contact for options" is enough
        }
        return false;
      case "Installation":
        // If no motor selected, they can skip; otherwise must choose yes/no
        if (state.motorOption === "own") return true;
        return state.installationOption !== null;
      case "Delivery":
        return state.deliveryType === "pickup" || (state.deliveryType === "delivery" && state.deliveryAddress.trim().length > 0);
      case "Review":
        return state.customerName.trim().length > 0 && state.customerEmail.trim().length > 0;
      default:
        return false;
    }
  }, [currentStepName, state, isPackageBrand]);

  return {
    state,
    dispatch,
    brand,
    isPackageBrand,
    steps,
    currentStepName,
    totalSteps,
    selectedModel,
    selectedColor,
    colorPrice,
    selectedEquipment,
    equipmentTotal,
    selectedTrailer,
    trailerPrice,
    motorInstallFee,
    installationFee,
    isSaltySkiffs,
    motorAddOn,
    selectedPackageMotor,
    basePrice,
    totalPrice,
    canGoNext,
  };
}
