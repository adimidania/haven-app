import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getListOfUsers() {
  return prisma.user.findMany();
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function createUser(formData: Omit<User, "id" | "isActive">) {
  return prisma.user.create({
    data: {
      ...formData,
      isActive: true,
    },
  });
}

export async function udpateUser(
  id: string,
  formData: Omit<User, "id" | "isActive" | "password">
) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      ...formData,
    },
  });
}

export async function changeUserPassword(id: string, password: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
}
