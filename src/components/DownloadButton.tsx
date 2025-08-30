"use client";

import React from "react";

const DownloadLink = () => {
  return (
    <a
      href="/TrustChain-Whitepaper.pdf"
      download="TrustChain-Whitepaper.pdf"
      className="inline-block w-full sm:w-auto bg-yellow-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-200 text-center text-sm sm:text-base"
    >
      <span className="hidden sm:inline">Download Whitepaper</span>
      <span className="sm:hidden">Whitepaper</span>
    </a>
  );
};

export default DownloadLink;