import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Started creating superuser");
  await prisma.user.create({
    data: {
      name: process.env.SUPER_USER_NAME!,
      email: process.env.SUPER_USER_EMAIL!,
      password: await bcrypt.hash(
        process.env.SUPER_USER_PASSWORD!,
        parseInt(process.env.HASH_ROUNDS!)
      ),
      dateOfBirth: new Date(),
      country: "ET",
      role: "SUPER_USER",
    },
  });
  console.log("Superuser created succefully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
