import React from "react";
import RootHome from "@/components/root-home";
import { AppProvider } from "@/components/context/app-context";

export default function RootLayout() {
  return (
    <AppProvider>
      <RootHome />
    </AppProvider>
  );
}
