"use client";
import { PostType, SavedPostsFamilyChildPostType } from '@/types/modelsTypes';
import { timeDifference } from '@/utils/dataManipulator';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface UserCommentBoxBarProps {
    post: PostType | SavedPostsFamilyChildPostType
}

const UserCommentBoxBar: React.FC<UserCommentBoxBarProps> = ({ post }) => {
    const [timeStringToShown, setTimeStringToShown] = useState<string>("");


    useEffect(() => {
        const updatedAt: Date = new Date(post.createdAt);
        const now: Date = new Date();
        const diffMs: number = now.getTime() - updatedAt.getTime();
        setTimeStringToShown(timeDifference(diffMs));
    }, [post]);

    return (
        <>
            <div className="flex gap-3 p-3 item-start">
                <div className="flex gap-3">
                    <div className="min-w-[40px] h-[40px]">
                        <Image
                            src={`http://127.0.0.1:8000/uploads/profile/${post.user.imageUrl}/100_100.jpg`}
                            width={40} height={40} alt="post"
                            className="w-[40px] h-[40px] object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="break-all text-sm">
                            <span className="font-semibold">{post.user.userName} </span>
                            <pre className="break-all whitespace-pre-wrap">
                                {post.description}
                            </pre>
                        </div>
                        <div className="flex gap-3 text-xs">
                            <button className="hover:text-[#dedede] text-[#dedededd]">Edited • {timeStringToShown}</button>
                        </div>
                    </div>
                </div>
                <div className="pt-3 h-fit w-[20px]">
                    &nbsp;
                </div>
            </div>
        </>
    )
}


export default UserCommentBoxBar
