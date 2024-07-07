"use client";
import React, { useState } from 'react'
import PostsCard from './PostsCard'

const PostsRecyclerView = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

    return (
        <div className='px-28'>
            {/* <PostsCard url={"/videos/vid1.mp4"} /> */}
            <PostsCard url={"/videos/vid2.mp4"} videoPlaying={videoPlaying} setVideoPlaying={setVideoPlaying} />
            <PostsCard url={"/videos/vid3.mp4"} videoPlaying={videoPlaying} setVideoPlaying={setVideoPlaying} />
            <PostsCard url={"/videos/vid4.mp4"} videoPlaying={videoPlaying} setVideoPlaying={setVideoPlaying} />

        </div>
    )
}

export default PostsRecyclerView