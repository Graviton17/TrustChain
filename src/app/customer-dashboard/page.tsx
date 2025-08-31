"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRoleFromUser } from "@/utils/roles";
import LogoutButton from "@/components/LogoutButton";

export default function CustomerDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLoaded && user) {
      const userRole = getRoleFromUser(user);
      if (userRole !== "customer") {
        // Redirect to appropriate dashboard based on role
        switch (userRole) {
          case "government":
            router.push("/government-dashboard");
            break;
          case "producer":
            router.push("/producer-dashboard");
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
                Customer Dashboard
              </h1>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl">👤</span>
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
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
                >
                  <span className="mr-2">💰</span>
                  View Subsidies
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full">
                  <span className="mr-2">🛒</span>
                  Browse Products
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:col-span-2 lg:col-span-1">
                  <span className="mr-2">📊</span>
                  Usage Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Green Hydrogen Market */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">🔋</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Available Products
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      12 Green Hydrogen Products
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 sm:px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  Browse marketplace
                </a>
              </div>
            </div>
          </div>

          {/* My Orders */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📦</span>
                  </div>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1 min-w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Orders
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      3 Orders
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 sm:px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all orders
                </a>
              </div>
            </div>
          </div>

          {/* Subsidy Benefits */}
          <div className="bg-white overflow-hidden shadow rounded-lg sm:col-span-2 lg:col-span-1">
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
                      Subsidy Savings
                    </dt>
                    <dd className="text-base sm:text-lg font-medium text-gray-900">
                      $2,450 Saved
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 sm:px-5 py-3">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View subsidy details
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">✅</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Order #HG-2024-001 delivered
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Green hydrogen fuel cells - 2 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">🚚</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Order #HG-2024-002 in transit
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Hydrogen storage tank - Expected delivery: Tomorrow
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">💸</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Subsidy applied to Order #HG-2024-003
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Saved $850 on renewable energy equipment - 1 week ago
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
