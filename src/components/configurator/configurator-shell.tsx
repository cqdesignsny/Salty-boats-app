"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useConfigurator } from "./use-configurator";
import { StepIndicator } from "./step-indicator";
import { BuildSummary } from "./build-summary";
import { BrandSelect } from "./steps/brand-select";
import { BoatSelect } from "./steps/boat-select";
import { ColorSelect } from "./steps/color-select";
import { EquipmentSelect } from "./steps/equipment-select";
import { TrailerSelect } from "./steps/trailer-select";
import { MotorSelect } from "./steps/motor-select";
import { InstallationSelect } from "./steps/installation-select";
import { DeliverySelect } from "./steps/delivery-select";
import { ReviewSubmit } from "./steps/review-submit";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getBrandBySlug, getModelBySlug } from "@/lib/data";

export function ConfiguratorShell() {
  const {
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
    selectedTrailerAddOns,
    trailerAddOnTotal,
    motorInstallFee,
    installationFee,
    installationPrice,
    isSaltySkiffs,
    motorAddOn,
    selectedPackageMotor,
    basePrice,
    totalPrice,
    canGoNext,
  } = useConfigurator();

  // Auto-select brand from URL query param (e.g., ?brand=stumpnocker)
  const searchParams = useSearchParams();
  const didAutoSelect = useRef(false);

  useEffect(() => {
    if (didAutoSelect.current) return;
    const brandParam = searchParams.get("brand");
    const modelParam = searchParams.get("model");
    if (brandParam && getBrandBySlug(brandParam) && !state.brandSlug) {
      didAutoSelect.current = true;
      dispatch({ type: "SET_BRAND", payload: brandParam });

      // If a model slug was also provided, auto-select it and skip to Color step
      if (modelParam) {
        const model = getModelBySlug(brandParam, modelParam);
        if (model) {
          dispatch({ type: "SET_MODEL", payload: model.id });
          dispatch({ type: "GO_TO_STEP", payload: 2 }); // Color step
          return;
        }
      }

      dispatch({ type: "NEXT_STEP" }); // Just brand — go to Boat step
    }
  }, [searchParams, state.brandSlug, dispatch]);

  // Scroll to top whenever the step changes
  const prevStep = useRef(state.step);
  useEffect(() => {
    if (state.step !== prevStep.current) {
      prevStep.current = state.step;
      // Force scroll to absolute top — instant, no smooth
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [state.step]);

  function handleNext() {
    if (canGoNext()) {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function handleBack() {
    dispatch({ type: "PREV_STEP" });
  }

  function renderStep() {
    switch (currentStepName) {
      case "Brand":
        return (
          <BrandSelect
            selected={state.brandSlug}
            onSelect={(slug) => dispatch({ type: "SET_BRAND", payload: slug })}
          />
        );

      case "Boat":
        if (!brand) return null;
        return (
          <BoatSelect
            brand={brand}
            selected={state.modelId}
            onSelect={(id) => dispatch({ type: "SET_MODEL", payload: id })}
          />
        );

      case "Color":
        if (!state.modelId) return null;
        return (
          <ColorSelect
            modelId={state.modelId}
            selected={state.hullColorId}
            onSelect={(id) => dispatch({ type: "SET_COLOR", payload: id })}
            isPackageBrand={isPackageBrand}
          />
        );

      case "Equipment":
        if (!state.modelId) return null;
        return (
          <EquipmentSelect
            modelId={state.modelId}
            selected={state.selectedEquipmentIds}
            onToggle={(id) =>
              dispatch({ type: "TOGGLE_EQUIPMENT", payload: id })
            }
          />
        );

      case "Trailer":
        if (!state.modelId) return null;
        return (
          <TrailerSelect
            modelId={state.modelId}
            selected={state.trailerId}
            onSelect={(id) => dispatch({ type: "SET_TRAILER", payload: id })}
            isPackageBrand={isPackageBrand}
            selectedAddOnIds={state.selectedTrailerAddOnIds}
            onToggleAddOn={(id) => dispatch({ type: "TOGGLE_TRAILER_ADDON", payload: id })}
          />
        );

      case "Motor":
        return (
          <MotorSelect
            motorOption={state.motorOption}
            onSetOption={(opt) =>
              dispatch({ type: "SET_MOTOR_OPTION", payload: opt })
            }
            isPackageBrand={isPackageBrand}
            modelId={state.modelId}
            selectedPackageMotorId={state.motorId}
            onSelectPackageMotor={(id) =>
              dispatch({ type: "SET_MOTOR", payload: id })
            }
          />
        );

      case "Installation":
        return (
          <InstallationSelect
            installationOption={state.installationOption}
            onSetOption={(opt) =>
              dispatch({ type: "SET_INSTALLATION", payload: opt })
            }
            hasMotor={state.motorOption === "select"}
            installationPrice={installationPrice}
          />
        );

      case "Delivery":
        return (
          <DeliverySelect
            deliveryType={state.deliveryType}
            deliveryAddress={state.deliveryAddress}
            onSetType={(type) =>
              dispatch({ type: "SET_DELIVERY_TYPE", payload: type })
            }
            onSetAddress={(addr) =>
              dispatch({ type: "SET_DELIVERY_ADDRESS", payload: addr })
            }
          />
        );

      case "Review":
        if (!brand || !selectedModel || !selectedColor) return null;
        return (
          <ReviewSubmit
            brand={brand}
            model={selectedModel}
            color={selectedColor}
            colorPrice={colorPrice}
            equipment={selectedEquipment}
            equipmentTotal={equipmentTotal}
            trailer={selectedTrailer}
            trailerPrice={trailerPrice}
            trailerAddOns={selectedTrailerAddOns}
            trailerAddOnTotal={trailerAddOnTotal}
            motorOption={state.motorOption}
            motorInstallFee={motorInstallFee}
            installationFee={installationFee}
            motorAddOn={motorAddOn}
            selectedPackageMotor={selectedPackageMotor}
            deliveryType={state.deliveryType}
            deliveryAddress={state.deliveryAddress}
            totalPrice={totalPrice}
            isPackageBrand={isPackageBrand}
            customerName={state.customerName}
            customerEmail={state.customerEmail}
            customerPhone={state.customerPhone}
            onSetName={(name) =>
              dispatch({ type: "SET_CUSTOMER_NAME", payload: name })
            }
            onSetEmail={(email) =>
              dispatch({ type: "SET_CUSTOMER_EMAIL", payload: email })
            }
            onSetPhone={(phone) =>
              dispatch({ type: "SET_CUSTOMER_PHONE", payload: phone })
            }
          />
        );

      default:
        return null;
    }
  }

  const isFirstStep = state.step === 0;
  const isLastStep = state.step === totalSteps - 1;
  const showSummary = true;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 lg:top-20 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <StepIndicator
            steps={steps}
            currentStep={state.step}
            onGoToStep={(step) => dispatch({ type: "GO_TO_STEP", payload: step })}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main step area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              {renderStep()}
            </div>

            {/* Navigation buttons — mobile/tablet only (desktop uses build summary nav) */}
            {currentStepName !== "Review" && (
              <div className="flex justify-between mt-6 lg:hidden">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className={isFirstStep ? "invisible" : ""}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canGoNext()}
                >
                  {isLastStep ? "Review Build" : "Next"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          {showSummary && (
            <div className="lg:w-80 flex-shrink-0">
              <BuildSummary
                brand={brand ?? null}
                model={selectedModel}
                color={selectedColor}
                colorPrice={colorPrice}
                equipment={selectedEquipment}
                equipmentTotal={equipmentTotal}
                trailer={selectedTrailer}
                trailerPrice={trailerPrice}
                trailerAddOns={selectedTrailerAddOns}
                trailerAddOnTotal={trailerAddOnTotal}
                motorInstallFee={motorInstallFee}
                installationFee={installationFee}
                motorAddOn={motorAddOn}
                motorOption={state.motorOption}
                selectedPackageMotor={selectedPackageMotor}
                deliveryType={state.deliveryType}
                basePrice={basePrice}
                totalPrice={totalPrice}
                isPackageBrand={isPackageBrand}
                onNext={handleNext}
                onBack={handleBack}
                canGoNext={canGoNext()}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                showNav={currentStepName !== "Review"}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky price bar */}
      {showSummary && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy text-white border-t border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.15)] z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="text-xs text-white/60 block">Estimated Total</span>
              <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
            </div>
            {currentStepName !== "Review" && (
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!canGoNext()}
                className="bg-ocean hover:bg-ocean-dark text-white"
              >
                {isLastStep ? "Review Build" : "Next Step"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
