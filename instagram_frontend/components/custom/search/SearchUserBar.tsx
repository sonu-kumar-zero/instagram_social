import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'


interface SearchUserBarProps {
    // bio: string | null,
    // followerCount: number,
    // followingCount: number,
    id: string,
    imageUrl: string | null,
    // postsCount: number,
    // profileType: string,
    userName: string,
    name: string | null
}

const SearchUserBar: React.FC<SearchUserBarProps> = ({ userName, imageUrl, id, name }) => {
    return (
        <>
            <div className="px-5 hover:bg-[#232323] flex items-center justify-between py-2 cursor-pointer">
                <Link href={`/${userName}`} className="flex items-center gap-3 w-full">
                    <div className="">
                        <Image src={imageUrl ? `http://127.0.0.1:8000/uploads/profile/${imageUrl}/100_100.jpg` : "/images/sonu_profile.jpeg"} width={50} height={50} alt='user_profile_icon' className='w-[50px] h-[50px] object-cover rounded-full' />
                    </div>
                    <div className="">
                        <div className="">{userName}</div>
                        <div className="text-[#dedede77] text-sm">{name ? name : ""}</div>
                    </div>
                </Link>
                <button className="text-2xl">
                    <RxCross2 />
                </button>
            </div>
        </>
    )
}
export default SearchUserBar
