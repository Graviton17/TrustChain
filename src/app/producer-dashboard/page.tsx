"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoleFromUser } from "@/utils/roles";
import LogoutButton from "@/components/LogoutButton";

export default function ProducerDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLoaded && user) {
      const userRole = getRoleFromUser(user);
      if (userRole !== "producer") {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
          case "government":
            router.push("/government-dashboard");
            break;
          case "customer":
            router.push("/customer-dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Producer Dashboard
              </h1>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl">🏭</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 truncate">
                Welcome,{" "}
                {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
              </div>
              <LogoutButton variant="secondary" className="text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <button
                  onClick={() => router.push("/subsidies")}
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
                >
                  <span className="mr-2">💰</span>
                  Browse Subsidies
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full">
                  <span className="mr-2">📊</span>
                  Production Report
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:col-span-2 lg:col-span-1">
                  <span className="mr-2">🔧</span>
                  Equipment Status
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Production Volume */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">⚡</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Monthly Production
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      1,250 kg H₂
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📋</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Orders
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      18 Orders
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Subsidies Received */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-lg">💰</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Subsidies Received
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      $45,600
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Carbon Credits */}
          <div className="bg-white overflow-hidden shadow rounded-lg sm:col-span-2 xl:col-span-1">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-lg">🌱</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Carbon Credits
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      2,150 Tons CO₂
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Production Overview */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Production Facilities
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Plant A - Mumbai
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity: 500 kg H₂/day
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start sm:self-center">
                    Active
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Plant B - Pune
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity: 750 kg H₂/day
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start sm:self-center">
                    Active
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Plant C - Chennai
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity: 300 kg H₂/day
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 self-start sm:self-center">
                    Maintenance
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Subsidy Applications
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">✅</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Green Hydrogen Production Incentive
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      $15,000 approved - Applied 3 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">⏳</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Clean Energy Equipment Grant
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      $25,000 under review - Applied 1 week ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">✅</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Carbon Neutral Manufacturing Credit
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      $8,500 approved - Applied 2 weeks ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
