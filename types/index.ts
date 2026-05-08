export type Tier = 'free' | 'pro' | 'max';

export interface User {
  id: number;
  email: string;
  name: string;
  tier: Tier;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SubscriptionInfo {
  plan: 'pro' | 'max';
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface ContentResponse {
  title: string;
  body: string;
  items: { id: string; name: string }[];
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface ApiError {
  error: { code: string; message: string };
}

export const tierOrder: Record<Tier, number> = { free: 0, pro: 1, max: 2 };

export function tierAtLeast(actual: Tier, min: Tier): boolean {
  return tierOrder[actual] >= tierOrder[min];
}
