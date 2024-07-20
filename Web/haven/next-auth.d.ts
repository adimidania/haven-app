import "next-auth/jwt";
import type { User } from "next-auth";

const Role: {
  USER: "USER";
  SUPER_USER: "SUPER_USER";
} = {
  USER: "USER",
  SUPER_USER: "SUPER_USER",
};
type Role = (typeof Role)[keyof typeof Role];

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
    };
  }
}
