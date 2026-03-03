import { ConfiguratorShell } from "@/components/configurator/configurator-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Boat",
  description:
    "Configure your custom Stumpnocker, Palmetto Bay, or Salty Skiff boat with our interactive builder. Choose your hull color, equipment, trailer, and motor.",
};

export default function BuildYourBoatPage() {
  return <ConfiguratorShell />;
}
