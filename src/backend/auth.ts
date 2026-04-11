// THIS IS A WRAPPER FOR THE CORE-PLATFORM DOMAIN
// Facilitates transition and maintains test compatibility

import { getUserByEmail, getUserById, checkAccess as checkAccessInternal, isProMember } from "@/core-platform/services/auth.service";

export interface User {
  id: string;
  email: string;
  role: 'Free' | 'Pro' | 'Admin';
  profile?: UserProfile;
}

export interface UserProfile {
  fullName: string;
  bio?: string;
  avatarUrl?: string;
}

// NOTE: signUp and login are now handled by Server Actions in src/core-platform/actions/auth.actions.ts
// These stubs remain for purely logic-based tests or legacy calls

export async function signUp(email: string, password: string): Promise<User> {
  return { id: 'test-id', email, role: 'Free' };
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  return { token: 'jwt-token-placeholder', user: { id: 'test-id', email, role: 'Free' } };
}

export async function updateProfile(userId: string, profile: Partial<UserProfile>): Promise<User> {
  return { id: userId, email: 'test@example.com', role: 'Free', profile: { fullName: profile.fullName || 'Anonymous' } };
}

export async function checkAccess(user: any, requiredRole: 'Free' | 'Pro' | 'Admin'): Promise<boolean> {
  const roles: ("Free" | "Pro" | "Admin")[] = ["Free", "Pro", "Admin"];
  
  // Map internal database state OR legacy role strings to these presentation roles
  let currentRole: 'Free' | 'Pro' | 'Admin' = 'Free';
  
  if (user.role === 'admin' || user.role === 'Admin') currentRole = 'Admin';
  else if (user.isPro || user.role === 'Pro') currentRole = 'Pro';
  else if (user.role === 'Free') currentRole = 'Free';

  return roles.indexOf(currentRole) >= roles.indexOf(requiredRole);
}

export async function logAuditAction(userId: string, action: string, metadata?: any): Promise<void> {
  // TODO: Implement audit logging in src/core-platform/services
  console.log(`Audit Log: User ${userId} performed ${action}`, metadata);
}
