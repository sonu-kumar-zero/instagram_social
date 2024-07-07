"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { RiMessengerLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useUserState } from '@/context/userContext';
import EmojiBoard from './EmojiBoard';
import { CommentType, PostType, ReelPostType, SavedPostsFamilyChildPostType, UserType } from '@/types/modelsTypes';
import UserCommentBoxBar from './UserCommentBoxBar';
import CommentBoxBar from './CommentBoxBar';
import M3U8Player from './M3U8Player';

interface CollectionDataType {
    id: string;
    givenName: string;
}

interface BookMarkComponentProps {
    user: UserType | null;
    post?: PostType | SavedPostsFamilyChildPostType | ReelPostType
}

export const BookMarkComponent: React.FC<BookMarkComponentProps> = ({ user, post }) => {
    const [postSavedInCollection, setPostSavedInCollection] = useState<boolean>(false);
    const [collectionOptionsShow, setCollectionOptionsShow] = useState<boolean>(false);
    const [collectionList, setCollectionList] = useState<CollectionDataType[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const collectionContainerRef = useRef<HTMLDivElement>(null);

    const fetchCollectionList = useCallback(async () => {
        try {
            if (!user || !collectionOptionsShow) {
                return;
            };
            const fetchCollectionListResponse = await axios.get(
                `http://localhost:4000/api/upload/post/saved/post/collection/${user.id}`
            );
            if (fetchCollectionListResponse.status === 200)
                setCollectionList(fetchCollectionListResponse.data.collection);
        } catch (error: any) {
            console.log(error.message);
        }
    }, [user, collectionOptionsShow]);

    useEffect(() => {
        fetchCollectionList();
    }, [fetchCollectionList]);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isHovering) {
            timer = setTimeout(() => {
                setCollectionOptionsShow(true);
            }, 2000);
        } else {
            if (timer) {
                clearTimeout(timer);
            }
        };
        return () => {
            if (timer) {
                clearTimeout(timer);
            };
        };
    }, [isHovering]);

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const togglePostInUserCollection = async (collectionId: string | undefined) => {
        try {
            if (!user || !post || !collectionId)
                return;
            const togglePostInUserCollectionResponse = await axios.post(
                `http://localhost:4000/api/upload/post/saved/post/${user.id}/${post.id}/${collectionId}`
            );

            if (togglePostInUserCollectionResponse.status === 200)
                fetchStatusOfSavedInCollection();

        } catch (error: any) {
            console.log(error.message);
        }
    };

    const fetchStatusOfSavedInCollection = useCallback(async () => {
        try {
            if (!user || !post)
                return;
            const togglePostInUserCollectionResponse = await axios.get(
                `http://localhost:4000/api/upload/post/saved/post/${user.id}/${post.id}/${user.userDefaultSavedId}`
            );

            if (togglePostInUserCollectionResponse.status === 200)
                setPostSavedInCollection(togglePostInUserCollectionResponse.data.saved);
        } catch (error: any) {
            console.log(error.message);
        }
    }, [post, user]);

    useEffect(() => {
        fetchStatusOfSavedInCollection();
    }, [fetchStatusOfSavedInCollection]);

    useEffect(() => {
        const handleClick = (e: any) => {
            if (collectionContainerRef.current && !collectionContainerRef.current.contains(e.target))
                setCollectionOptionsShow(false);
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, []);


    return (
        <>
            <div className="relative">
                <button onClick={() => {
                    togglePostInUserCollection(user?.userDefaultSavedId);
                }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >{
                        postSavedInCollection ?
                            <svg aria-label="Remove" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Remove</title>
                                <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z">
                                </path>
                            </svg>
                            : <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Save</title>
                                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                            </svg>
                    }
                </button>
                {
                    collectionOptionsShow &&
                    <div className='absolute z-50 bottom-10 right-1/2 bg-[#232323] min-w-[150px] rounded-md' ref={collectionContainerRef}>
                        <div className="h-2 rounded-t-xl"></div>
                        {
                            collectionList.map((collection) => {
                                return (
                                    <button key={collection.id} className="hover:bg-[#2f2f2f] px-3 py-2 text-base cursor-pointer w-full" onClick={
                                        () => {
                                            togglePostInUserCollection(collection.id)
                                        }
                                    }>{collection.givenName}</button>
                                )
                            }
                            )
                        }
                        <div className="h-2 rounded-b-xl"></div>
                    </div>
                }
            </div>
        </>
    )
}


interface PostDisplayerProps {
    setPostDisplayerOn: React.Dispatch<React.SetStateAction<boolean>>,
    post?: PostType | SavedPostsFamilyChildPostType
};


const PostDisplayer: React.FC<PostDisplayerProps> = ({ setPostDisplayerOn, post }) => {
    const userStates = useUserState();
    const user: UserType | null = userStates ? userStates.user : null;
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [localTimeString, setLocalTimeString] = useState<string>("");
    const postContainerRef = useRef<HTMLDivElement>(null);
    const [allCommentsOfPosts, setAllCommentsOfPosts] = useState<CommentType[]>([]);
    const [userCommentString, setUserCommentString] = useState<string>("");
    const [likeOnThisPostByUser, setLikeOnThisPostByUser] = useState<boolean>(false);
    const [isEmojiBoardOpen, setIsEmojiBoardOpen] = useState<boolean>(false);
    const [parrentCommentId, setParrentCommentId] = useState<string | null>(null);
    const [parrentCommentUserName, setParrentCommentUserName] = useState<string | null>(null);
    const [isFollowRequestSended, setIsFollowRequestSended] = useState<boolean>(false);
    const [followAccepted, setFollowAccepted] = useState<boolean>(false);

    const checkIsFollowAccepted = useCallback(async () => {
        try {
            if (!user || !post)
                return;
            const checkIsFollowAcceptedResponse = await axios.get(
                `http://localhost:4000/api/user/follow/status/${user.id}/${post.userId}`
            );
            if (checkIsFollowAcceptedResponse.status === 200) {
                setIsFollowRequestSended(true);
                setFollowAccepted(checkIsFollowAcceptedResponse.data.status.isAccepted);
            }
        } catch (error) {
            console.log(error);
        }
    }, [user, post]);

    useEffect(() => {
        checkIsFollowAccepted();
    }, [checkIsFollowAccepted]);

    const handleFriendRequestSend = async () => {
        try {
            if (!user || !post)
                return;
            const friendRequestSendResponse = await axios.post(`http://localhost:4000/api/user/follow/${user.id}/${post.userId}`);
            if (friendRequestSendResponse.status === 200)
                checkIsFollowAccepted();
        } catch (error) {
            console.log(error);
        }
    }

    const toggleLikeOnPost = async () => {
        try {
            if (!user || !post)
                return;
            const toggleLikeOnPostResponse = await axios.post(
                `http://localhost:4000/api/upload/post/like/post/${user.id}/${post.id}`
            );

            if (toggleLikeOnPostResponse.status === 200)
                fetchStatusOfLike();

        } catch (error: any) {
            console.log(error.message);
        }
    }

    const sendCommentOnPost = async () => {
        try {
            if (!user || !post)
                return;
            if (userCommentString === "")
                return;
            let userComment = userCommentString;
            if (parrentCommentUserName) {
                userComment = userCommentString.replace("@" + parrentCommentUserName + " ", "");
            };
            await axios.post(
                `http://localhost:4000/api/upload/post/comment/${user.id}/${post.id}`,
                {
                    commentText: userComment,
                    parentCommentId: parrentCommentId
                }
            );
            setUserCommentString("");
            fetchAllCommentsOfGivenPostId();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const fetchAllCommentsOfGivenPostId = useCallback(async () => {
        if (!post)
            return;
        const allCommentsOfPostsResponse = await axios.get(
            `http://localhost:4000/api/upload/post/comment/${post.id}`
        );
        if (allCommentsOfPostsResponse.status === 200) {
            console.log(allCommentsOfPostsResponse.data.comments);
            setAllCommentsOfPosts(allCommentsOfPostsResponse.data.comments);
        }
    }, [post]);

    const fetchStatusOfLike = useCallback(async () => {
        try {
            if (!user || !post)
                return;
            const fetchStatusOfLikeResponse = await axios.get(
                `http://localhost:4000/api/upload/post/like/post/${user.id}/${post.id}`
            );

            if (fetchStatusOfLikeResponse.status === 200) {
                setLikeOnThisPostByUser(fetchStatusOfLikeResponse.data.like);
            };
        } catch (error: any) {
            console.log(error.message);
        }
    }, [post, user]);

    useEffect(() => {
        fetchAllCommentsOfGivenPostId();
    }, [fetchAllCommentsOfGivenPostId]);


    useEffect(() => {
        fetchStatusOfLike();
    }, [fetchStatusOfLike]);

    useEffect(() => {
        if (!post) return;
        const updatedAt: Date = new Date(post.updatedAt);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const readableDate: string = updatedAt.toLocaleDateString('en-US', options);
        setLocalTimeString(readableDate)
    }, [post]);

    useEffect(() => {
        if (userCommentString === "") {
            setParrentCommentId(null);
            setParrentCommentUserName(null);
        }
    }, [userCommentString]);

    useEffect(() => {
        if (parrentCommentUserName) {
            setUserCommentString("@" + parrentCommentUserName + " ");
        }
    }, [parrentCommentUserName]);

    const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!postContainerRef)
            return;
        const current = postContainerRef.current;
        if (!current)
            return;
        current.scrollBy({ behavior: "smooth", left: -400 });
        setCurrentIdx((prev) => (prev - 1));
    }

    const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!postContainerRef)
            return;
        const current = postContainerRef.current;
        if (!current)
            return;
        current.scrollBy({ behavior: "smooth", left: 400 });
        setCurrentIdx((prev) => (prev + 1));
    }

    return (
        <>
            <div className="absolute top-0 left-0 z-50 w-[100dvw] h-[100dvh] bg-[#12121288] px-40 py-5 flex justify-center rounded-xl main_box_post_displayer" onClick={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.classList.contains("main_box_post_displayer")) {
                    setPostDisplayerOn(false);
                };
            }}>
                <div className="flex w-full h-full  justify-center">
                    <div className="max-w-[700px] h-full relative">
                        <div ref={postContainerRef} className={` ${(post && post.postUrls[currentIdx].type === "VIDEO") ? "max-w-[450px]" : "max-w-[700px]"} h-full flex overflow-x-hidden snap-mandatory snap-x remove_scroll_bar`}>
                            {
                                post && post.postUrls.map(
                                    (posturl, index) => {
                                        if (posturl.type === "IMAGE")
                                            return (
                                                <Image key={posturl.id} src={`http://127.0.0.1:8000/uploads/posts/${posturl.url}/1080_1080.jpg`} width={1080} height={1080} alt="post" className="w-[700px] h-full object-cover snap-center" />
                                            )
                                        else if (posturl.type === "VIDEO")
                                            return (
                                                <M3U8Player url={`http://127.0.0.1:8000/uploads/reels/${posturl.url}/index.m3u8`} key={posturl.id} index={index} currentIdx={currentIdx} />
                                            )
                                    }
                                )
                            }
                        </div>
                        {
                            post && post.postUrlCount > 1 && currentIdx < post.postUrlCount - 1 &&
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <button onClick={scrollRight} className='bg-[#121212aa] p-4 rounded-full'>
                                    <svg
                                        aria-label="Right chevron"
                                        fill="currentColor"
                                        height="16"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="16">
                                        <title>Right chevron</title>
                                        <polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                    </svg>
                                </button>
                            </div>
                        }
                        {
                            post && post.postUrlCount > 1 && currentIdx > 0 &&
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <button onClick={scrollLeft} className='bg-[#121212aa] p-4 rounded-full'>
                                    <svg
                                        aria-label="Left chevron"
                                        fill="currentColor"
                                        height="16"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="16">
                                        <title>Left chevron</title>
                                        <polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="w-2/5 bg-[#090909] border-l-1 h-full flex flex-col">
                        {/*profile box */}
                        <div className="flex justify-between p-3 border-b gap-3">
                            <div className="flex items-center gap-3">
                                <Image src={post ? `http://127.0.0.1:8000/uploads/profile/${post.user.imageUrl}/100_100.jpg` : "/images/sonu_profile.jpeg"} width={40} height={40} alt="post" className="w-[40px] h-[40px] object-cover rounded-full" />
                                <div className="text-[14px] font-medium flex gap-1">
                                    <div className="cursor-pointer text-[#dedede] hover:text-[#dedede77]">{post ? post.user.userName : "userName"}</div>
                                    <div className="cursor-default">•</div>
                                    {
                                        user && post && user.id !== post.userId && isFollowRequestSended &&
                                        followAccepted &&
                                        <div className="text-[#0095f6] font-semibold hover:text-[#dedede]">Following</div>
                                    }{
                                        user && post && user.id !== post.userId && isFollowRequestSended &&
                                        !followAccepted &&
                                        <div className="text-[#0095f6] font-semibold hover:text-[#dedede]">Requested</div>
                                    }
                                    {
                                        user && post && user.id !== post.userId && !isFollowRequestSended
                                        &&
                                        <button className="text-[#0095f6] font-semibold hover:text-[#dedede]" onClick={handleFriendRequestSend}>Follow</button>
                                    }
                                </div>
                            </div>
                            <button className='text-xl py-2 px-2 hover:text-[#898989] hover:font-bold text-[#dedede]'>
                                <IoEllipsisHorizontal />
                            </button>
                        </div>

                        {/*all comment box  */}
                        <div className="h-full w-full overflow-y-scroll remove_scroll_bar flex flex-col gap-1">
                            {
                                post && <UserCommentBoxBar post={post} />
                            }
                            {
                                allCommentsOfPosts.map((comment) => {
                                    return (
                                        <CommentBoxBar key={comment.id} comment={comment} user={user} post={post} setParrentCommentId={setParrentCommentId} setParrentCommentUserName={setParrentCommentUserName} />
                                    )
                                })
                            }
                        </div>

                        {/* info box */}
                        <div className="flex flex-col gap-3 p-3 border-t">
                            <div className="flex text-2xl justify-between">
                                <div className="flex gap-3">
                                    <button onClick={() => {
                                        toggleLikeOnPost();
                                    }}>
                                        {
                                            likeOnThisPostByUser ?
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
                                    <button><RiMessengerLine /></button>
                                    <button><FiSend /></button>
                                </div>
                                <BookMarkComponent user={user} post={post} />
                            </div>

                            <div className="">
                                <div className=''>Liked by <span className='font-medium'>{post?.likesCount}</span>
                                </div>
                                <div className='text-[#dedede77] text-xs'>{localTimeString}</div>
                            </div>

                        </div>

                        {/* input comment */}
                        <div className="p-3 border-t w-full flex gap-3 h-fit max-h-[80px] items-center relative">
                            <GrEmoji className="cursor-pointer" size={28} onClick={
                                () => {
                                    setIsEmojiBoardOpen(true);
                                }
                            } />
                            {
                                isEmojiBoardOpen &&
                                <div className='absolute bottom-16'>
                                    <EmojiBoard setIsEmojiBoardOpen={setIsEmojiBoardOpen} setUserCommentString={setUserCommentString} />
                                </div>
                            }
                            <textarea onKeyDown={
                                (e) => {
                                    console.log(e.key);
                                    if (e.key === "Enter") {
                                        sendCommentOnPost();
                                    } else if (e.key === "Backspace") {
                                        if (userCommentString === "@" + parrentCommentUserName) {
                                            setUserCommentString("");
                                        }
                                    }
                                }}
                                value={userCommentString}
                                onChange={
                                    (e) => {
                                        setUserCommentString(e.target.value);
                                    }
                                }
                                placeholder='Add a comment...'
                                rows={2}
                                className='max-h-[80px] resize-none w-full outline-none bg-[#090909] text-[#dedededd]' />
                            <button className='text-[#0095f6] font-semibold hover:text-[#dedede]' onClick={
                                (e) => {
                                    sendCommentOnPost();
                                }
                            }>Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="absolute top-5 right-5 z-50 rounded-full cursor-pointer hover:bg-[#23232355] p-3" onClick={() => { setPostDisplayerOn(false) }}>
                <RxCross2 size={60} />
            </button>
        </>
    )
}

export default PostDisplayer