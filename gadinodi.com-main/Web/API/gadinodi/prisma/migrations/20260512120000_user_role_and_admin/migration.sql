-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Buyer', 'Admin', 'Superadmin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'Buyer';

CREATE INDEX "User_role_idx" ON "User"("role");
