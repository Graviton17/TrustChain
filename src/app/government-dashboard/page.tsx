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
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Government Dashboard
              </h1>
              <span className="ml-3 text-2xl">🏛️</span>
            </div>
            <div className="text-sm text-gray-600">
              Welcome,{" "}
              {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push("/subsidies")}
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">💰</span>
                  Manage Subsidies
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="mr-2">📊</span>
                  View Analytics
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="mr-2">📋</span>
                  Review Applications
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Subsidies Disbursed */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Subsidies
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">$2.4M</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Applications */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📋</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Applications
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">142</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Producers */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🏭</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Registered Producers
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">89</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Carbon Impact */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 text-lg">🌱</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      CO₂ Reduction
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      45,200 Tons
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push("/subsidies-manager")}
                  className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">⚙️</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-blue-900">
                      Manage Subsidies
                    </div>
                    <div className="text-xs text-blue-700">
                      Create, edit, and manage subsidy programs
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => router.push("/subsidies")}
                  className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">💰</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-green-900">
                      Browse Subsidies
                    </div>
                    <div className="text-xs text-green-700">
                      View all available subsidy programs
                    </div>
                  </div>
                </button>
                <button className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-2xl mr-3">📊</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-purple-900">
                      Analytics Dashboard
                    </div>
                    <div className="text-xs text-purple-700">
                      View detailed reports and analytics
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications and Policy Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Subsidy Applications
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🏭</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        GreenH2 Industries
                      </p>
                      <p className="text-sm text-gray-500">
                        Production Incentive - $25,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🏭</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        CleanEnergy Corp
                      </p>
                      <p className="text-sm text-gray-500">
                        Equipment Grant - $45,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🏭</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        EcoHydrogen Ltd
                      </p>
                      <p className="text-sm text-gray-500">
                        Research Grant - $15,000
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
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
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">📊</div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        National Green Hydrogen Mission
                      </p>
                      <p className="text-sm text-blue-700">
                        Budget: $500M | Active Schemes: 12
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🎯</div>
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Production Linked Incentive
                      </p>
                      <p className="text-sm text-green-700">
                        Target: 5 MMT by 2030 | Current: 0.8 MMT
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🔬</div>
                    <div>
                      <p className="text-sm font-medium text-purple-900">
                        R&D Innovation Fund
                      </p>
                      <p className="text-sm text-purple-700">
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
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Blockchain Transparency Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">⛓️</div>
                  <div className="text-2xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-gray-600">
                    Transactions Recorded
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Data Integrity</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-gray-900">245</div>
                  <div className="text-sm text-gray-600">
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
