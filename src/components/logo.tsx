import React from "react";
import Image from "next/image";
import icon from "@/app/icon.png";

interface LogoProps {
  className?: string;
}

function Logo({ className = "" }: LogoProps) {
  return (
    <div
      className={`absolute top-[25px] left-[150px] flex items-center z-10 ${className}`}
    >
      <Image
        src={icon}
        alt="WurkFlo Logo"
        width={40}
        height={40}
        className="mr-3"
      />
      <span className="text-gray-900 text-[30px] font-bold">TrustChain</span>
    </div>
  );
}

export default Logo;
