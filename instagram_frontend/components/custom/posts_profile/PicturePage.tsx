"use client";
import React, { useCallback, useEffect, useState } from 'react'
import PostsGridChild from '../explore/PostsGridChild'
import { useUserState } from '@/context/userContext';
import axios from 'axios';
import { PostType, UserType } from '@/types/modelsTypes';

interface PicturePageProps {
    userName?: string
}

const PicturePage: React.FC<PicturePageProps> = ({ userName }) => {
    const userStates = useUserState();
    const realUser: UserType | null = userStates ? userStates.user : null;
    const currentUser: UserType | null = userStates ? userStates.currentUser : null;
    const [userPosts, setUserPosts] = useState<PostType[]>([]);

    const fetchUserPosts = useCallback(async () => {
        try {
            if (realUser && realUser.userName === userName) {
                const userPostsResponse = await axios.get(`http://localhost:4000/api/upload/post/${realUser.id}`);
                if (userPostsResponse.status === 200) {
                    setUserPosts(userPostsResponse.data.allPosts);
                };
            } else if (realUser && currentUser) {
                if (currentUser.profileType === "PUBLIC") {
                    const userPostsResponse = await axios.get(`http://localhost:4000/api/upload/post/${currentUser.id}`);
                    if (userPostsResponse.status === 200) {
                        setUserPosts(userPostsResponse.data.allPosts);
                    };
                } else {
                    const checkIsFollowAcceptedResponse = await axios.get(
                        `http://localhost:4000/api/user/follow/status/${realUser.id}/${currentUser.id}`
                    );
                    if (checkIsFollowAcceptedResponse.status === 200) {
                        if (checkIsFollowAcceptedResponse.data.status.isAccepted) {
                            const userPostsResponse = await axios.get(`http://localhost:4000/api/upload/post/${currentUser.id}`);
                            if (userPostsResponse.status === 200) {
                                setUserPosts(userPostsResponse.data.allPosts);
                            };
                        } else {
                            setUserPosts([]);
                        }
                    }
                }
            }
        } catch (error: any) {
            console.log(error.message);
            setUserPosts([]);
        }
    }, [realUser, userName, currentUser])

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    return (
        <>
            <div className="grid grid-cols-3 w-full gap-1">
                {
                    userPosts.map((post) => {
                        return (
                            <PostsGridChild key={post.id} height={"h-[300px]"} post={post} />
                        )
                    })
                }
                {
                    userPosts.length < 1 && (
                        <div className='col-span-3 h-[200px] flex items-center justify-center'>
                            <div className="flex flex-col items-center gap-7">
                                <div className="w-[70px] h-[70px] rounded-full border border-[#454545] flex items-center justify-center">
                                    <svg
                                        role="img"
                                        width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <title>Camera</title>
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd" d="M6.39252 3.83025C7.04361 2.75654 8.20958 2 9.54508 2H14.4549C15.7904 2 16.9564 2.75654 17.6075 3.83025C17.8059 4.15753 18.0281 4.50118 18.257 4.81533C18.3665 4.96564 18.5804 5.08571 18.8771 5.08571H18.9998C21.209 5.08571 23 6.87668 23 9.08571V17C23 19.2091 21.2091 21 19 21H5C2.79086 21 1 19.2091 1 17V9.08572C1 6.87668 2.79052 5.08571 4.99976 5.08571H5.12238C5.41912 5.08571 5.63348 4.96564 5.74301 4.81533C5.97193 4.50118 6.19407 4.15753 6.39252 3.83025ZM9.54508 4C8.98673 4 8.43356 4.32159 8.10267 4.86727C7.88516 5.22596 7.63139 5.61989 7.35939 5.99317C6.81056 6.74635 5.94404 7.08571 5.12286 7.08571H5.00024C3.89578 7.08571 3 7.98104 3 9.08572V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9.08571C21 7.98104 20.1047 7.08571 19.0002 7.08571H18.8776C18.0564 7.08571 17.1894 6.74635 16.6406 5.99317C16.3686 5.61989 16.1148 5.22596 15.8973 4.86727C15.5664 4.32159 15.0133 4 14.4549 4H9.54508ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" fill="#343434" />
                                    </svg>
                                </div>
                                <div className="font-bold text-xl">
                                    No Posts Yet
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default PicturePage
