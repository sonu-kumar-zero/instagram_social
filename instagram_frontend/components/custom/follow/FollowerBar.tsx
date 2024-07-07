"use client";
import React from 'react';
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';

interface FollowerBarProps {
    userName: string,
    name: string | null,
    followRequestId: string,
    userId: string,
    followerId: string,
    isAccepted: boolean,
    imageUrl: string | null
};

const FollowerBar: React.FC<FollowerBarProps> = ({ userName, name, userId, followRequestId, followerId, isAccepted, imageUrl }) => {

    const acceptRequestHandler = async () => {
        try {
            const acceptRequestResponse = await axios.put(`http://localhost:4000/api/user/follow/${userId}/${followerId}`,);
            if (acceptRequestResponse.status === 200) {
                console.log(acceptRequestResponse.data);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="hover:bg-[#565656] w-full p-3 flex justify-between items-center">
                <Link href={`/${userName}`} className="flex gap-2 items-center cursor-pointer">
                    <div className="">
                        <Image
                            src={
                                imageUrl ?
                                    `http://127.0.0.1:8000/uploads/profile/${imageUrl}/100_100.jpg`
                                    :
                                    "/images/sonu_profile.jpeg"
                            }
                            width={50}
                            height={50}
                            className='rounded-full w-[50px] h-[50px] object-cover' alt='profile_image' />
                    </div>
                    <div className="">
                        <div className="">{userName}</div>
                        <div className="text-xs">{name}</div>
                    </div>
                </Link>
                <div className="">
                    {
                        isAccepted ?
                            <button
                                className='bg-[#505050] rounded-xl px-3 py-1'
                            >Remove</button> :
                            <button
                                className='bg-[#0095f6] rounded-xl px-3 py-1'
                                onClick={acceptRequestHandler}
                            >Accept</button>
                    }
                </div>
            </div>
        </>
    )
}
export default FollowerBar
