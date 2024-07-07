import Image from 'next/image'
import React from 'react'

const FriendBar = () => {
    return (
        <div className='flex justify-between items-center px-10'>
            <div className="flex gap-3 items-center">
                <div>
                    <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt='profile_img' className='rounded-full object-cover cursor-pointer' />
                </div>
                <div>
                    <div className="cursor-pointer text-[14px] font-medium">starksonu12</div>
                    <div className="text-xs text-[#dedede] text-opacity-60 cursor-default">starksonu12</div>
                </div>
            </div>
            <button className='text-xs py-2 px-2 hover:text-[#dedede] hover:font-bold text-[#0095f6]'>Switch</button>
        </div>
    )
}

export default FriendBar