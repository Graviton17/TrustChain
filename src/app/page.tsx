"use client";

import { useState } from "react";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturesSection from "@/components/features-section";
import TrustSection from "@/components/trust-section";
import { RoleSelectionModal } from "@/components/role-selection-modal";

export default function Page() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const handleStartApplication = () => {
    setIsRoleModalOpen(true);
  };
  return (
    <main>
      <HeroSection onStartApplication={handleStartApplication} />
      <StatsSection />
      <FeaturesSection />
      <TrustSection />
      <RoleSelectionModal 
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)} 
      />
    </main>
  )
}
