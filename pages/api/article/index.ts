import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const { method } = req;

  try {
    if (method === "GET") {
      const allUsers = await prisma.article.findMany();
      console.log(allUsers);
      return res.status(200).json({});
    } else if (method === "POST") {
      return res.status(201).json({});
    } else {
      return new Error("Method unsupported");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
