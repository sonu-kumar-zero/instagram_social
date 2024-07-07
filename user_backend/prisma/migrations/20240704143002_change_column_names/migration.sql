/*
  Warnings:

  - You are about to drop the column `reelLikeCount` on the `PostUrl` table. All the data in the column will be lost.
  - You are about to drop the column `reelViewCount` on the `PostUrl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostUrl" DROP COLUMN "reelLikeCount",
DROP COLUMN "reelViewCount",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;
