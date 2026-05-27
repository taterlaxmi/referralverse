"use client";
import React, { useState, useEffect } from 'react';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export default function Analytics({ gaId, gtmId }: { gaId: string, gtmId: string }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Ensure scripts don't block the initial page render/hydration
    const timer = setTimeout(() => setLoad(true), 3500); 
    
    // Also load on user interaction
    const handleInteraction = () => setLoad(true);
    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  if (!load) return null;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
