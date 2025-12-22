"use client"

import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<'loading' | 'prelanding' | 'main'>('loading');

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setStep('main'), 3000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  if (step === 'loading') return <LoadingPage />;
  return <>{children}</>;
}
