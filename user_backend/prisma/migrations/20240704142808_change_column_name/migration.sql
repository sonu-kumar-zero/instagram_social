/*
  Warnings:

  - You are about to drop the column `reelCommentCount` on the `PostUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostUrl" DROP COLUMN "reelCommentCount",
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;
