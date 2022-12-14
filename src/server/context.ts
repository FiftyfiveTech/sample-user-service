import db from "./prismaClient";
import { PrismaClient } from "@prisma/client";

export interface Context {
  db: PrismaClient;
}

export const context = {
  db,
};
