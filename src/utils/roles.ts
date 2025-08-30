/**
 * Utility functions for role-based functionality
 */

export type UserRole = "government" | "producer" | "customer";

export interface RoleConfig {
  value: UserRole;
  label: string;
  icon: string;
  description: string;
  dashboardRoute: string;
}

export const ROLES: Record<UserRole, RoleConfig> = {
  government: {
    value: "government",
    label: "Government",
    icon: "🏛️",
    description: "Government agencies managing subsidies and policies",
    dashboardRoute: "/government-dashboard",
  },
  producer: {
    value: "producer",
    label: "Producer",
    icon: "🏭",
    description: "Green hydrogen producers and manufacturers",
    dashboardRoute: "/producer-dashboard",
  },
  customer: {
    value: "customer",
    label: "Customer",
    icon: "👤",
    description: "End customers and consumers",
    dashboardRoute: "/customer-dashboard",
  },
};

/**
 * Get role configuration by role value
 */
export function getRoleConfig(role: UserRole): RoleConfig {
  return ROLES[role];
}

/**
 * Get dashboard route for a specific role
 */
export function getDashboardRoute(role: UserRole): string {
  return ROLES[role].dashboardRoute;
}

/**
 * Get all available roles
 */
export function getAllRoles(): RoleConfig[] {
  return Object.values(ROLES);
}

/**
 * Check if a role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return role in ROLES;
}

/**
 * Get role from user metadata
 */
export function getRoleFromUser(user: {
  unsafeMetadata?: { role?: string };
}): UserRole | null {
  const role = user.unsafeMetadata?.role;
  return role && isValidRole(role) ? role : null;
}
