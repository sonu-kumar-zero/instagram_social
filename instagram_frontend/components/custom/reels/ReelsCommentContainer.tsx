"use client";
import { ReelCommentType, ReelType, UserType } from '@/types/modelsTypes';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import EmojiBoard from '../common/EmojiBoard';
import { timeDifference } from '@/utils/dataManipulator';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import CommentBoxBar from '../common/CommentBoxBar';

interface ReelCommentBarProps {
    comment: ReelCommentType;
    user: UserType | null;
    setParrentCommentId: React.Dispatch<React.SetStateAction<string | null>>;
    setParrentCommentUserName: React.Dispatch<React.SetStateAction<string | null>>;
    reel: ReelType;
    fetchAllCommentsOfGivenReelId: () => Promise<void>;
}

const ReelCommentBar: React.FC<ReelCommentBarProps> = ({ comment, user, reel, setParrentCommentId, setParrentCommentUserName, fetchAllCommentsOfGivenReelId }) => {
    const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
    const [showMoreOptionsButton, setShowMoreOptionsButton] = useState<boolean>(false);
    const [commentBoxBarTimeString, setCommentBoxBarTimeString] = useState<string>("");
    const [commentReplies, setCommentReplies] = useState<ReelCommentType[]>([]);
    const [showAllComments, setShowAllComments] = useState<boolean>(false);
    const [likedByUser, setLikedByUser] = useState<boolean>(false);

    const deleteThisComment = async () => {
        try {
            if (!user)
                return;
            const deleteThisCommentResponse = await axios.delete(
                `http://localhost:4000/api/upload/reel/comment/reel/${user.id}/${reel.id}`,
                {
                    data: {
                        commentId: comment.id,
                        parentCommentId: comment.parentReelCommentId
                    }
                }
            );
            if (deleteThisCommentResponse.status === 200)
                fetchAllCommentsOfGivenReelId();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleLikeOnComment = async () => {
        try {
            if (!user)
                return;
            const toggleLikeOnCommentResponse = await axios.post(
                `http://localhost:4000/api/upload/reel/comment/reel/like/${user.id}/${comment.id}`
            );
            if (toggleLikeOnCommentResponse.status === 200)
                fetchLikeStatusOnCommentByUser();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLikeStatusOnCommentByUser = useCallback(async () => {
        try {
            if (!user)
                return;
            const fetchLikeStatusOnCommentByUserResponse = await axios.get(
                `http://localhost:4000/api/upload/reel/comment/reel/like/${user.id}/${comment.id}`
            );
            if (fetchLikeStatusOnCommentByUserResponse.status === 200) {
                setLikedByUser(fetchLikeStatusOnCommentByUserResponse.data.like);
            }
        } catch (error) {
            console.log(error);
        }
    }, [user, comment]);

    const fetchAllRepliesOfThisComment = async () => {
        try {
            if (!user || !comment || !reel)
                return;
            const fetchAllRepliesOfThisCommentResponse = await axios.get(
                `http://localhost:4000/api/upload/reel/comment/reel/replie/${user.id}/${reel.id}/${comment.id}`
            );
            console.log(fetchAllRepliesOfThisCommentResponse);
            if (fetchAllRepliesOfThisCommentResponse.status === 200)
                setCommentReplies(fetchAllRepliesOfThisCommentResponse.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchLikeStatusOnCommentByUser();
    }, [fetchLikeStatusOnCommentByUser]);

    useEffect(() => {
        const updatedAt: Date = new Date(comment.updatedAt);
        const now: Date = new Date();
        const diffMs: number = now.getTime() - updatedAt.getTime();
        setCommentBoxBarTimeString(timeDifference(diffMs));
    }, [comment]);


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
                        likedByUser ?
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
                <div className={`pl-[64px] text-sm text-[#454545] ${(comment.commentCount !== 0 &&
                    !showAllComments) ? "flex" : "hidden"}`}>
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            fetchAllRepliesOfThisComment();
                            setShowAllComments(true);
                        }
                    } className="text-sm text-[#454545]">
                        View Replies
                    </button> ({comment.commentCount})
                </div>
            }
            {
                <div className={`pl-[64px] text-sm text-[#454545] ${(comment.commentCount !== 0 &&
                    showAllComments) ? "flex" : "hidden"}`}>
                    <button onClick={
                        (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setShowAllComments(false);
                        }
                    } className='text-sm text-[#454545]'>Hide Replies
                    </button>
                </div>
            }
            {
                showAllComments &&
                <div className="pl-[12px]">
                    {
                        commentReplies.map((replie) => {
                            return <ReelCommentBar
                                key={replie.id}
                                comment={replie}
                                reel={reel}
                                setParrentCommentId={setParrentCommentId}
                                setParrentCommentUserName={setParrentCommentUserName}
                                user={user}
                                fetchAllCommentsOfGivenReelId={fetchAllCommentsOfGivenReelId} />
                        })
                    }
                </div>
            }
            {
                <div className={`fixed top-0 left-0 z-50 w-[100dvw] h-[100dvh] justify-center items-center bg-[#000000aa] ${showMoreOptions ? "flex" : "hidden"}`}>
                    <div className='w-[400px] rounded-xl bg-[#232323]'>
                        <button className='w-full hover:bg-[#343434]  rounded-t-xl text-red-500 font-semibold flex justify-center py-3 border-b border-[#343434]'>Report</button>
                        <button className={`w-full hover:bg-[#343434] text-red-500 font-semibold justify-center py-3 border-b border-[#343434] ${(reel && user && (reel.post.userId === user.id || user.id === comment.userId)) ? "flex" : "hidden"}`} onClick={
                            (e) => {
                                deleteThisComment();
                            }
                        }>Delete</button>
                        <button className='w-full hover:bg-[#343434]  rounded-b-xl text-[#dedede] font-semibold flex justify-center py-3' onClick={() => {
                            setShowMoreOptions(false);
                        }}>Cancel</button>
                    </div>
                </div >
            }
        </>
    )
}

interface ReelsCommentContainerProps {
    setCommentBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType | null;
    reel: ReelType;
}

const ReelsCommentContainer: React.FC<ReelsCommentContainerProps> = ({ setCommentBoxOpen, user, reel }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [commentsList, setCommentList] = useState<ReelCommentType[]>([]);
    const [isEmojiBoardOpen, setIsEmojiBoardOpen] = useState<boolean>(false);
    const [commentString, setCommentString] = useState<string>("");
    const [parrentCommentId, setParrentCommentId] = useState<string | null>(null);
    const [parrentCommentUserName, setParrentCommentUserName] = useState<string | null>(null);

    const sendCommentOntheReel = async () => {
        try {
            if (!user || !reel)
                return;
            if (commentString === "")
                return;
            let userComment = commentString;
            if (parrentCommentUserName) {
                userComment = commentString.replace("@" + parrentCommentUserName + " ", "");
            };
            await axios.post(
                `http://localhost:4000/api/upload/reel/comment/reel/${user.id}/${reel.id}`,
                {
                    commentString: userComment,
                    parentReelCommentId: parrentCommentId
                }
            );
            setCommentString("");
            fetchAllCommentsOfGivenReelId();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (commentString === "") {
            setParrentCommentId(null);
            setParrentCommentUserName(null);
        }
    }, [commentString]);

    useEffect(() => {
        if (parrentCommentUserName)
            setCommentString("@" + parrentCommentUserName + " ");
    }, [parrentCommentUserName]);

    const fetchAllCommentsOfGivenReelId = useCallback(async () => {
        try {
            if (!user || !reel)
                return;
            const fetchAllCommentsOfGivenReelIdResponse = await axios.get(
                `http://localhost:4000/api/upload/reel/comment/reel/${user.id}/${reel.id}`
            );
            if (fetchAllCommentsOfGivenReelIdResponse.status === 200)
                setCommentList(fetchAllCommentsOfGivenReelIdResponse.data.comments);
        } catch (error) {
            console.log(error);
        }
    }, [reel, user]);

    useEffect(() => {
        fetchAllCommentsOfGivenReelId();
    }, [fetchAllCommentsOfGivenReelId])

    useEffect(() => {
        const handleClick = (e: any) => {
            if (containerRef.current && !containerRef.current.contains(e.target))
                setCommentBoxOpen(false);
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [setCommentBoxOpen]);

    return (
        <>
            <div className="w-[350px] h-[60dvh] rounded-xl bg-[#232323] py-3 flex flex-col gap-5" ref={containerRef}>
                <div className="px-5 py-2 flex">
                    <div className="w-[40px] flex justify-start">
                        <button className="" onClick={() => {
                            setCommentBoxOpen(false);
                        }}>
                            <svg aria-label="Close" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Close</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
                        </button>
                    </div>
                    <div className="flex justify-center w-full">
                        <span className='font-medium text-base'>Comments</span>
                    </div>
                    <div className="w-[40px] h-1"></div>
                </div>
                <div className="flex flex-col gap-1 h-full overflow-y-scroll">
                    {
                        commentsList.map((comment) => {
                            return <ReelCommentBar key={comment.id} comment={comment} user={user} setParrentCommentId={setParrentCommentId} setParrentCommentUserName={setParrentCommentUserName} reel={reel} fetchAllCommentsOfGivenReelId={fetchAllCommentsOfGivenReelId} />
                        })
                    }
                </div>
                <div className="px-5 w-full">
                    <div className="rounded-[100px] border border-[#898989] flex gap-3 w-full px-1 py-1 items-center">
                        {
                            user &&
                            <Image src={`http://127.0.0.1:8000/uploads/profile/${user.imageUrl}/100_100.jpg`} className="w-[40px] h-[40px] rounded-full border border-[#898989]" width={40} height={40} alt="user_profile_img" />
                        }
                        <div className="w-full flex items-center">
                            <textarea name="" id="" className='text-base resize-none outline-none bg-transparent w-full' placeholder='Add a comment...' rows={1} value={commentString} onChange={
                                (e) => {
                                    setCommentString(e.target.value);
                                }
                            }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        sendCommentOntheReel();
                                    else if (e.key === "Backspace") {
                                        if (commentString === "@" + parrentCommentUserName)
                                            setCommentString("");
                                    }
                                }}></textarea>
                        </div>
                        {
                            commentString !== "" &&
                            <button className='text-[#0095f6] font-semibold hover:text-[#dedede]' onClick={
                                (e) => {
                                    sendCommentOntheReel();
                                }
                            }>Post</button>
                        }
                        <div className="">
                            <GrEmoji className="cursor-pointer" size={28} onClick={
                                () => {
                                    setIsEmojiBoardOpen(true);
                                }
                            } />
                            {
                                isEmojiBoardOpen &&
                                <div className='absolute bottom-16 right-0'>
                                    <EmojiBoard setIsEmojiBoardOpen={setIsEmojiBoardOpen} setUserCommentString={setCommentString} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReelsCommentContainer
