import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@fundman.in",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

main();