import React from 'react'
import { DollarSign, Building } from 'lucide-react'
import { useUser } from "@clerk/nextjs"
import { getRoleFromUser } from "@/utils/roles"

function SubsidiesHeader() {
  const { user } = useUser();
  const userRole = user ? getRoleFromUser(user) : null;
  
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-2 sm:p-3 rounded-2xl">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Subsidies Portal
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Discover funding opportunities worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-xs sm:text-sm text-gray-600 bg-white/50 px-3 sm:px-4 py-2 rounded-full border border-gray-200">
                Welcome,{" "}
                <span className="font-medium">
                  {user?.username || user?.emailAddresses?.[0]?.emailAddress || "User"}
                </span>
              </div>
              
              {/* Only show Manage Subsidies button for government users */}
              {userRole === "government" && (
                <a
                  href="/subsidies-manager"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Manage Subsidies
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default SubsidiesHeader