/*
  Warnings:

  - A unique constraint covering the columns `[userSavedId,postId]` on the table `UserSavedPost` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PostUrl" ADD COLUMN     "reelCommentCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "UserSavedPost_userSavedId_postId_key" ON "UserSavedPost"("userSavedId", "postId");
