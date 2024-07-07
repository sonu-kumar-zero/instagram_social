"use client";
import { getAllFollowersOfUserByUserId } from '@/constants/queries';
import { useUserState } from '@/context/userContext';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import Link from "next/link";
import FollowerBar from './FollowerBar';
import { FollowerUserType } from '@/types/modelsTypes';

const FollowersPage = () => {
    const [allFollowers, setAllFollowers] = useState<FollowerUserType[]>([]);
    const userStates = useUserState();
    const user = userStates ? userStates.user : null;
    const currentUser = userStates ? userStates.currentUser : null;

    // we will implement pagination in it later 
    const fetchAllFollowersOfUsers = useCallback(async () => {
        if (!currentUser.id)
            return

        const allFollowersOfUsersByUserIdResponse = await axios.get(
            `http://localhost:4000/api/user/follow/follower/${currentUser.id}`
        );

        if (allFollowersOfUsersByUserIdResponse.status === 200) {
            setAllFollowers((prev) => (allFollowersOfUsersByUserIdResponse.data.users));
        };
    }, [currentUser?.id]);

    useEffect(() => {
        fetchAllFollowersOfUsers();
    }, [fetchAllFollowersOfUsers]);

    return (
        <>
            <div className="w-[100dvw] h-[100dvh] bg-[#343434aa] flex justify-center items-center absolute top-0 left-0 z-20">
                <div className="w-[400px] rounded-xl bg-[#454545]">
                    <div className="relative p-3 border-b border-[#494949]">
                        <div className="absolute left-1/2 -translate-x-1/2 font-semibold">Followers</div>
                        <Link href={`/${currentUser.userName}`} className='absolute right-3'>
                            <RxCross2 size={24} />
                        </Link>
                    </div>
                    <div className="py-3 px-5">
                        <input placeholder='Search...' className='outline-none bg-transparent w-full' />
                    </div>
                    <div className="min-h-[300px] max-h-[50dvh] overflow-y-scroll">
                        {
                            allFollowers.map((foll) => {
                                return <FollowerBar
                                    key={foll.id}
                                    followRequestId={foll.id}
                                    followerId={foll.followerId}
                                    isAccepted={foll.isAccepted}
                                    name={foll.follower.name}
                                    userId={foll.followingId}
                                    userName={foll.follower.userName}
                                    imageUrl={foll.follower.imageUrl} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowersPage
