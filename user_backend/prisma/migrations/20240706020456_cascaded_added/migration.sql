-- DropForeignKey
ALTER TABLE "ReelCommentLike" DROP CONSTRAINT "ReelCommentLike_reelCommentId_fkey";

-- AddForeignKey
ALTER TABLE "ReelCommentLike" ADD CONSTRAINT "ReelCommentLike_reelCommentId_fkey" FOREIGN KEY ("reelCommentId") REFERENCES "ReelComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
