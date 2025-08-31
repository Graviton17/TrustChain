"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "minimal";
}

export default function LogoutButton({ 
  className = "", 
  variant = "secondary" 
}: LogoutButtonProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const baseClasses = "flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    secondary: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
    minimal: "text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500"
  };

  return (
    <button
      onClick={handleLogout}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title="Sign out"
    >
      <span className="mr-2">🚪</span>
      Sign Out
    </button>
  );
}
