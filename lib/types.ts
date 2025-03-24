// types.ts
export interface Balance {
  balance: string;
  id: number;
  package: string;
  user_id: number;
}

export interface Referral {
  referrer_user_id: number;
  referred_user_id: number;
  referral_id: number;
  referral_type_id: number;
}

export interface FundTransfer {
  user_id: number;
  amount: string;
  date: string;
  email: string;
  id: number;
}

export interface Withdrawal {
  // Define withdrawal properties based on your API
  id: number;
  amount: string;
  status: string;
  date: string;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  Balances?: Balance;
  Withdrawals?: Withdrawal[]; // Array of withdrawals
  referrals?: Referral[]; // Array of referrals
  fund?: FundTransfer[]; // Array of fund transfers
  email?: string;
}

// Type guard with array checks
export function isUserValid(data: any): data is User {
  return (
    data &&
    (data.Balances === undefined || typeof data.Balances === "object") &&
    (data.Withdrawals === undefined || Array.isArray(data.Withdrawals)) &&
    (data.referrals === undefined || Array.isArray(data.referrals)) &&
    (data.fund === undefined || Array.isArray(data.fund))
  );
}
