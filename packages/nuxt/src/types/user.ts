import type { SubmittedAnswer, TestPerformanceResult } from "./test";

export interface UserPlan {
  id: string;
  stripe_customer_id: string;
  name: string;
  limit: number;
  used: number;
}

export interface UserAppMetadata {
  test_history: TestPerformanceResult[];
  plan: UserPlan;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  roles: RolesEnum[];
}

export interface User extends Profile {
  userId: string;
  tests: TestPerformanceResult[];
  tests_history: SubmittedAnswer[];
}

export enum RolesEnum {
  Admin = "admin",
}
