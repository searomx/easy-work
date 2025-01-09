import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@b4tech.tech.br" },
    update: {},
    create: {
      email: "admin@b4tech.tech.br",
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const writer1 = await prisma.user.upsert({
    where: { email: "tania@gmail.com" },
    update: {},
    create: {
      email: "tania@gmail.com",
      username: "tania",
      password: await bcrypt.hash("tania123", 10),
      role: "WRITER",
    },
  });

  const writer2 = await prisma.user.upsert({
    where: { email: "guto@gmail.com" },
    update: {},
    create: {
      email: "guto@gmail.com",
      username: "Guto",
      password: await bcrypt.hash("guto123", 10),
      role: "WRITER",
    },
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Artigo 1 escrito por Tania",
        content: "This is the content of Article 1 by Tania.",
        authorId: writer1.id,
      },
      {
        title: "Artigo 2 escrito por Tania",
        content: "This is the content of Article 2 by Tania",
        authorId: writer1.id,
      },
    ],
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Artigo 1 escrito por Guto",
        content: "This is the content of Article 1 by Guto",
        authorId: writer2.id,
      },
      {
        title: "Artigo 1 escrito por Guto",
        content: "This is the content of Article 2 by Guto",
        authorId: writer2.id,
      },
    ],
  });

  console.log("Users and articles seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
