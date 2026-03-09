"use client";

import { useReducer, useCallback, useMemo } from "react";
import type { ConfiguratorState, ConfiguratorAction } from "@/types/configurator";
import { STUMPNOCKER_STEPS, PACKAGE_STEPS } from "@/types/configurator";
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
      return { ...state, motorOption: action.payload, motorId: null };
    case "SET_MOTOR":
      return { ...state, motorId: action.payload };
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

  const steps = isPackageBrand ? PACKAGE_STEPS : STUMPNOCKER_STEPS;
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

  // Motor install fee ($85 if motor selected — Stumpnocker only)
  const motorInstallFee = !isPackageBrand && state.motorOption === "select" && state.motorId ? 85 : 0;

  // Package motor selection
  const selectedPackageMotor = state.motorId
    ? packageMotorOptions.find((m) => m.id === state.motorId) ?? null
    : null;

  // For package brands, the total is the package motor price (which includes everything)
  // For Stumpnocker, it's base + color + equipment + trailer + motor install
  const basePrice = selectedModel?.basePrice ?? 0;
  const totalPrice = isPackageBrand && selectedPackageMotor
    ? selectedPackageMotor.packagePrice + colorPrice
    : basePrice + colorPrice + equipmentTotal + trailerPrice + motorInstallFee;

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
          return !!state.motorId; // Must select a package motor
        }
        return state.motorOption === "own" || (state.motorOption === "select");
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
    selectedPackageMotor,
    basePrice,
    totalPrice,
    canGoNext,
  };
}
