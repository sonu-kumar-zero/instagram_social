"use client";
import { CommentType, PostType, SavedPostsFamilyChildPostType, UserType } from '@/types/modelsTypes';
import { timeDifference } from '@/utils/dataManipulator';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';

interface CommentBoxBarProps {
    comment: CommentType;
    user: UserType | null;
    post?: PostType | SavedPostsFamilyChildPostType;
    setParrentCommentId: React.Dispatch<React.SetStateAction<string | null>>;
    setParrentCommentUserName: React.Dispatch<React.SetStateAction<string | null>>
}


const CommentBoxBar: React.FC<CommentBoxBarProps> = ({ comment, user, post, setParrentCommentId, setParrentCommentUserName }) => {
    const [commentBoxBarTimeString, setCommentBoxBarTimeString] = useState<string>("");
    const [showMoreOptionsButton, setShowMoreOptionsButton] = useState<boolean>(false);
    const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
    const [commentReplies, setCommentReplies] = useState<CommentType[]>([]);
    const [showAllComments, setShowAllComments] = useState<boolean>(false);
    const [likeOnThisCommentByUser, setLikeOnThisCommentByUser] = useState<boolean>(false);

    const deleteThisComment = async () => {
        try {
            if (!user)
                return;
            await axios.delete(
                `http://localhost:4000/api/upload/post/comment/${user.id}/${comment.postId}/${comment.id}`,
                {
                    data: {
                        parentCommentId: comment.parentCommentId
                    }
                }
            );
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const fetchAllRepliesOfThisComment = async () => {
        try {
            if (!comment)
                return;
            const allRepliesOfThisCommentResponse = await axios.get(
                `http://localhost:4000/api/upload/post/comment/commentoncomment/${comment.id}`
            );
            if (allRepliesOfThisCommentResponse.status === 200) {
                setCommentReplies(allRepliesOfThisCommentResponse.data.comment);
            } else {
                setCommentReplies([]);
            }
        } catch (error: any) {
            console.log(error.message);
            setCommentReplies([]);
        }
    }

    const fetchStatusOfLikeOnComment = useCallback(async () => {
        try {
            if (!user || !comment)
                return;
            const fetchStatusOfLikeOnCommentResponse = await axios.get(
                `http://localhost:4000/api/upload/post/comment/like/${user.id}/${comment.id}`
            );
            console.log(fetchStatusOfLikeOnCommentResponse)
            if (fetchStatusOfLikeOnCommentResponse.status === 200) {
                setLikeOnThisCommentByUser(fetchStatusOfLikeOnCommentResponse.data.like);
            };

        } catch (error: any) {
            console.log(error.message);
        }
    }, [user, comment]);

    const toggleLikeOnComment = async () => {
        try {
            if (!user || !comment)
                return;
            const toggleLikeOnPostResponse = await axios.post(
                `http://localhost:4000/api/upload/post/comment/like/${user.id}/${comment.id}`
            );

            if (toggleLikeOnPostResponse.status === 200)
                fetchStatusOfLikeOnComment();

        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const updatedAt: Date = new Date(comment.updatedAt);
        const now: Date = new Date();
        const diffMs: number = now.getTime() - updatedAt.getTime();
        setCommentBoxBarTimeString(timeDifference(diffMs));
    }, [comment]);

    useEffect(() => {
        fetchStatusOfLikeOnComment();
    }, [fetchStatusOfLikeOnComment])

    return (
        <>
            <div className="flex gap-3 p-3 items-start w-full justify-between" onMouseEnter={() => {
                setShowMoreOptionsButton(true);
            }} onMouseLeave={() => {
                setShowMoreOptionsButton(false);
            }}
            >
                <div className="flex gap-3">
                    <div className="min-w-[40px] h-[40px]">
                        <Image
                            src={`http://127.0.0.1:8000/uploads/profile/${comment.user.imageUrl}/100_100.jpg`}
                            width={40}
                            height={40}
                            alt="post"
                            className="w-[40px] h-[40px] object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="break-all text-sm">
                            <span className="font-semibold">{comment.user.userName}</span>
                            <pre className="break-all whitespace-pre-wrap">
                                {comment.commentText}
                            </pre>
                        </div>
                        <div className="flex gap-3 text-xs">
                            <button className="hover:text-gray-400 text-gray-500">{commentBoxBarTimeString}</button>
                            <button className="hover:text-gray-400 text-gray-500">{comment.likesCount} likes</button>
                            <button className="hover:text-gray-400 text-gray-500" onClick={
                                () => {
                                    setParrentCommentId(comment.id);
                                    setParrentCommentUserName(comment.user.userName);
                                }
                            }>Reply</button>
                            {
                                showMoreOptionsButton &&
                                <button className="hover:text-gray-400 text-gray-500" onClick={
                                    () => {
                                        setShowMoreOptions(true);
                                    }
                                }>
                                    <IoEllipsisHorizontal />
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <button className="pt-3 h-fit pr-2" onClick={() => {
                    toggleLikeOnComment();
                }}>
                    {
                        likeOnThisCommentByUser ?
                            <svg aria-label="Unlike" fill="#ff0000" height="24" role="img" viewBox="0 0 48 48" width="24">
                                <title>Unlike</title>
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                            :
                            <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Like</title>
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                    }

                </button>
            </div>

            {
                comment.commentCount !== 0 && !showAllComments &&
                <div className='pl-[64px] text-sm text-[#454545]'>
                    <button onClick={
                        () => {
                            fetchAllRepliesOfThisComment();
                            setShowAllComments(true);
                        }
                    } className="text-sm text-[#454545]">View Replies</button> ({comment.commentCount})
                </div>
            }
            {
                comment.commentCount !== 0 && showAllComments &&
                <div className='pl-[64px] text-sm text-[#454545]'>
                    <button onClick={
                        () => {
                            setShowAllComments(false);
                        }
                    } className='text-sm text-[#454545]'>Hide Replies</button>
                </div>
            }
            {
                showAllComments &&
                (
                    <div className='pl-[64px]'>
                        {commentReplies.map((replie) => {
                            return (
                                <CommentBoxBar key={replie.id} comment={replie} setParrentCommentId={setParrentCommentId} setParrentCommentUserName={setParrentCommentUserName} user={user} post={post} />
                            )
                        })}
                    </div>
                )
            }
            {
                showMoreOptions &&
                (
                    <>
                        <div className="absolute top-0 left-0 z-50 w-[100dvw] h-[100dvh] flex justify-center items-center bg-[#000000aa]">
                            <div className="w-[400px] rounded-xl bg-[#232323]">
                                <button className='w-full hover:bg-[#343434]  rounded-t-xl text-red-500 font-semibold flex justify-center py-3 border-b border-[#343434]'>Report</button>
                                {
                                    post
                                    && user &&
                                    (post.userId === user.id || user.id === comment.userId)
                                    &&
                                    <button className='w-full hover:bg-[#343434] text-red-500 font-semibold flex justify-center py-3 border-b border-[#343434]' onClick={(e) => {
                                        deleteThisComment();
                                    }}>Delete</button>
                                }
                                <button className='w-full hover:bg-[#343434]  rounded-b-xl text-[#dedede] font-semibold flex justify-center py-3' onClick={() => {
                                    setShowMoreOptions(false);
                                }}>Cancel</button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}


export default CommentBoxBar
