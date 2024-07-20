"use server";

import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "@/data/user";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { FormData as SignUpFormData } from "../auth/sign-up/form";

export async function authenticate(formData: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    const user = await getUserByEmail(formData.email);

    if (user && !user.isActive) {
      const passwordsMatch = await bcrypt.compare(
        formData.password,
        user.password
      );
      if (passwordsMatch) {
        return "Your account is deactivated, contact the admin";
      }
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Unknown error.";
      }
    }
    throw error;
  }
}

export async function createAccountAction(data: SignUpFormData) {
  try {
    let user = await getUserByEmail(data.email);
    if (user) {
      return {
        key: "email",
        message: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      parseInt(process.env.HASH_ROUNDS!)
    );

    data.password = hashedPassword;
    const validatedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "USER" as any,
      country: data.country,
      dateOfBirth: new Date(data.dateOfBirth),
    };

    await createUser(validatedData);
  } catch (e) {
    return "Something unexpected happened.";
  }
}
