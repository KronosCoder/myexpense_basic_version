import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ Failed to connect:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
