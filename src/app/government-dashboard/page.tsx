"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoleFromUser } from "@/utils/roles";

export default function GovernmentDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLoaded && user) {
      const userRole = getRoleFromUser(user);
      if (userRole !== "government") {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
          case "producer":
            router.push("/producer-dashboard");
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
                Government Dashboard
              </h1>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl">🏛️</span>
            </div>
            <div className="text-sm text-gray-600 truncate">
              Welcome,{" "}
              {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
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
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                >
                  <span className="mr-2">💰</span>
                  Manage Subsidies
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full">
                  <span className="mr-2">📊</span>
                  View Analytics
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:col-span-2 lg:col-span-1">
                  <span className="mr-2">📋</span>
                  Review Applications
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Subsidies Disbursed */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">💰</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Subsidies
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">$2.4M</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Applications */}
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
                      Pending Applications
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">142</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Producers */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🏭</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Registered Producers
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">89</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Carbon Impact */}
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
                      CO₂ Reduction
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      45,200 Tons
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <button
                  onClick={() => router.push("/subsidies-manager")}
                  className="flex items-start sm:items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors w-full text-left"
                >
                  <div className="text-2xl mr-3 flex-shrink-0">⚙️</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-blue-900">
                      Manage Subsidies
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      Create, edit, and manage subsidy programs
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => router.push("/subsidies")}
                  className="flex items-start sm:items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors w-full text-left"
                >
                  <div className="text-2xl mr-3 flex-shrink-0">💰</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-green-900">
                      Browse Subsidies
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      View all available subsidy programs
                    </div>
                  </div>
                </button>
                <button className="flex items-start sm:items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors w-full text-left sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl mr-3 flex-shrink-0">📊</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-purple-900">
                      Analytics Dashboard
                    </div>
                    <div className="text-xs text-purple-700 mt-1">
                      View detailed reports and analytics
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications and Policy Overview */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Subsidy Applications
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 self-start sm:self-center">
                  View All
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        GreenH2 Industries
                      </p>
                      <p className="text-sm text-gray-500">
                        Production Incentive - $25,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 self-start sm:self-center">
                    Pending
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        CleanEnergy Corp
                      </p>
                      <p className="text-sm text-gray-500">
                        Equipment Grant - $45,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 self-start sm:self-center">
                    Approved
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🏭</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        EcoHydrogen Ltd
                      </p>
                      <p className="text-sm text-gray-500">
                        Research Grant - $15,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 self-start sm:self-center">
                    Under Review
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Policy Management
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start sm:items-center">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">📊</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-blue-900">
                        National Green Hydrogen Mission
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Budget: $500M | Active Schemes: 12
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start sm:items-center">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🎯</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-green-900">
                        Production Linked Incentive
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Target: 5 MMT by 2030 | Current: 0.8 MMT
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start sm:items-center">
                    <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🔬</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-purple-900">
                        R&D Innovation Fund
                      </p>
                      <p className="text-sm text-purple-700 mt-1">
                        Allocated: $50M | Projects Funded: 28
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Features */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Blockchain Transparency Dashboard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-2">⛓️</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Transactions Recorded
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-2">🔒</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Data Integrity</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
                  <div className="text-2xl sm:text-3xl mb-2">👥</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">245</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Active Stakeholders
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
