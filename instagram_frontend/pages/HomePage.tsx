
import FriendBar from '@/components/custom/homePage/FriendBar'
import PostsRecyclerView from '@/components/custom/homePage/PostsRecyclerView'
import StorieBar from '@/components/custom/homePage/StorieBar'
import React from 'react'

const HomePage = () => {

  return (
    <div className='px-32 w-full flex overflow-y-scroll'>
      <div className="w-2/3 ">
        <StorieBar />
        <PostsRecyclerView />
      </div>
      <div className='w-1/3 flex flex-col gap-4 py-10'>
        <FriendBar />
        <div className="flex justify-between px-10 pt-2 -mb-2">
          <div className="text-[#dedede] text-opacity-60 cursor-default text-sm">Suggested for you</div>
          <button className="font-medium text-xs px-2 py-2 hover:text-[#aaa]">See All</button>
        </div>
        <FriendBar />
        <FriendBar />
        <FriendBar />
        <FriendBar />
        <FriendBar />

        <div className="px-10 text-xs text-[#dedede] text-opacity-60">© Instagram From Sonu</div>
      </div>
    </div>
  )
}

export default HomePage