import Image from 'next/image'
import React from 'react'
import ConicalRainbowCircle from '../common/Canvas'

const StorieUnit = () => {
    return (
        <>
            <div className="w-[80px] flex flex-col items-center cursor-pointer relative">
                <div className="">
                    {/* <div className='absolute -z-10 right-[2px] -top-[3px]'>
                        <ConicalRainbowCircle width={76} height={76} />
                    </div> */}
                    <Image src={"/images/sonu_profile.jpeg"} width={70} height={70} alt='profile' className='rounded-full w-[70px] h-[70px] border-[3px] border-[#121212cc]' />
                </div>
                <div className="truncate text-sm w-[70px] pt-1">
                    Starksonu12
                </div>
            </div>
        </>
    )
}

const StorieBar = () => {
    return (
        <div className='py-5 px-3 flex gap-3 overflow-y-scroll w-[40dvw] remove_scroll_bar'>
            <StorieUnit />
            <StorieUnit />
        </div>
    )
}

export default StorieBar