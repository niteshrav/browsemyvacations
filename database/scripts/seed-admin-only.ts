import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim() || "admin@browsemyvacations.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "BMV Admin", active: true },
    create: { email, passwordHash, name: "BMV Admin", role: "admin", active: true },
  });

  console.log("Admin user seeded:", { id: user.id, email: user.email });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
