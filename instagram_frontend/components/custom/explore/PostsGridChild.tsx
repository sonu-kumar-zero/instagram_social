"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import PostDisplayer from '../common/PostDisplayer';
import { PostType, SavedPostsFamilyChildPostType } from '@/types/modelsTypes';
import ImageDisplayer from '../common/ImageDisplayer';


interface PostsGridChildProps {
    big?: boolean,
    height?: string,
    post: PostType | SavedPostsFamilyChildPostType
};

const PostsGridChild: React.FC<PostsGridChildProps> = ({ big, post, height = "h-full" }) => {
    const [overLayShow, SetOverLayShow] = useState<boolean>(false);
    const [postDisplayerOn, setPostDisplayerOn] = useState<boolean>(false);

    return (
        <>
            <div className={
                `w-full ${height} ${big ? 'row-span-2' : ''} relative cursor-pointer`
            }
                onMouseEnter={() => { SetOverLayShow(true) }}
                onMouseLeave={() => { SetOverLayShow(false) }}
                onClick={() => { setPostDisplayerOn(true) }}
            >
                {
                    post && post.typeOfPost === "IMAGE" &&
                    <Image src={`http://127.0.0.1:8000/uploads/posts/${post.postUrls[0].url}/1080_1080.jpg`} alt='post' width={500} height={500} className={
                        `object-cover w-full h-full`
                    } />
                }
                {
                    post && post.typeOfPost === "VIDEO" &&
                    <Image src={`http://127.0.0.1:8000/uploads/thumbnails/${post.postUrls[0].url}/1080_1920.jpg`} alt='post' width={1080} height={1920} className={
                        `object-cover w-full h-full`
                    } />
                }
                {
                    post && post.typeOfPost === "VIDEO" &&
                    <div className="absolute top-5 right-5">
                        <svg aria-label="Reels" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Reels</title>
                            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line>
                            <path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                            <path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                }
                {
                    post && post.typeOfPost === "IMAGE" && post.postUrlCount > 1 &&
                    <div className="absolute top-5 right-5">
                        <svg
                            aria-label="Carousel"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24">
                            <title>Carousel</title>
                            <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z">
                            </path>
                        </svg>
                    </div>
                }
                {
                    overLayShow &&
                    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-3 bg-[#12121244]">
                        <div className="flex gap-2 items-center">
                            <svg
                                role="img"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="#ffffff"
                                aria-label="Heart"
                            >
                                <title>Heart</title>
                                <path fill="#ffffff" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div>{post ? post.likesCount : "12.4K"}</div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <svg
                                aria-label="Messenger"
                                fill="currentColor"
                                height="24"
                                role="img"
                                viewBox="0 0 24 24"
                                width="24">
                                <title>Messenger</title>
                                <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" stroke-width="1.739">
                                </path>
                                <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd">
                                </path>
                            </svg>
                            <div>{post ? post.commentCount : 624}</div>
                        </div>
                    </div>
                }
            </div>
            {
                postDisplayerOn &&
                <PostDisplayer post={post} setPostDisplayerOn={setPostDisplayerOn} />
            }
        </>
    )
}

export default PostsGridChild