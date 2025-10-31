import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ DB connected');
  } catch (e) {
    console.error('❌ Cannot connect:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
