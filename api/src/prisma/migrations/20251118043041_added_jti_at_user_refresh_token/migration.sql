/*
  Warnings:

  - You are about to drop the `userResfreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userResfreshToken" DROP CONSTRAINT "userResfreshToken_userId_fkey";

-- DropTable
DROP TABLE "userResfreshToken";

-- CreateTable
CREATE TABLE "user_refresh_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_tokens_token_key" ON "user_refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_tokens_jti_key" ON "user_refresh_tokens"("jti");

-- CreateIndex
CREATE INDEX "idx_user_refresh_token_id" ON "user_refresh_tokens"("id");

-- CreateIndex
CREATE INDEX "idx_user_refresh_token_user_id" ON "user_refresh_tokens"("userId");

-- AddForeignKey
ALTER TABLE "user_refresh_tokens" ADD CONSTRAINT "user_refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
