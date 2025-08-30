"use client";

import React from "react";

const DownloadLink = () => {
  return (
    <a
      href="/TrustChain-Whitepaper.pdf"
      download="TrustChain-Whitepaper.pdf"
      className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200"
    >
      Download Whitepaper
    </a>
  );
};

export default DownloadLink;