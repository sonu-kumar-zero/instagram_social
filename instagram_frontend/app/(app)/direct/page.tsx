import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MessageBar = () => {

    return (
        <>
            <Link href={`/direct/123`} className="pl-5 hover:bg-[#1b1b1b] flex gap-3 items-center py-2 cursor-pointer">
                <Image src={"/images/sonu_profile.jpeg"} alt='profile' width={100} height={100} className='w-[60px] h-[60px] object-cover rounded-full' />
                <div className="flex flex-col w-[calc(100%-90px)]">
                    <div className="">Starksonu12</div>
                    <div className="text-xs text-[#676767] flex justify-between">
                        <div className="truncate">
                            Lorem ipsum
                        </div>
                        <div className="min-w-[60px]">7 min Ago</div>
                    </div>
                </div>
            </Link>
        </>
    )
}

const page = () => {
    return (
        <div className='h-[100dvh] border-r border-[#343434]'>
            <div className="pt-10 px-5 pb-5 flex justify-between">
                <div className="text-xl font-semibold">Starksonu12</div>
                <div className="">
                    <svg aria-label="New message" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </div>
            </div>
            <div className="h-[calc(100%-90px)] overflow-y-scroll">
                <div className="px-5 flex justify-between py-3">
                    <div className="font-semibold">Messages</div>
                    <button className="text-[#0095f6]">Request</button>
                </div>
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
                <MessageBar />
            </div>
        </div>
    )
}

export default page
