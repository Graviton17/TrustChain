"use client";

import dynamic from "next/dynamic";
import React from "react";

// dynamically import the heavy client-only CertificateClient and disable SSR
const DynCert = dynamic(() => import("./CertificateClient"), { ssr: false });

export default function CertificateLoader() {
  return <DynCert />;
}
