"use client";
import Image from 'next/image'
import React from 'react'
import PostsGridChild from './PostsGridChild';
import { PostType } from '@/types/modelsTypes';

interface PostsGridLayoutProps {
  isLeftLayout: boolean,
  post1: PostType,
  post2: PostType,
  post3: PostType,
  post4: PostType,
  post5: PostType,
}

const PostsGridLayout: React.FC<PostsGridLayoutProps> = ({ isLeftLayout, post1, post2, post3, post4, post5 }) => {

  return (
    <div className='grid grid-cols-3 gap-1 grid-rows-2 w-full h-[80dvh]'>
      {
        isLeftLayout ?
          <PostsGridChild big={true} post={post1} />
          :
          <PostsGridChild post={post1} />
      }
      <PostsGridChild post={post2} />
      {
        isLeftLayout ?
          <PostsGridChild post={post3} />
          :
          <PostsGridChild big={true} post={post3} />
      }
      <PostsGridChild post={post4} />
      <PostsGridChild post={post5} />
    </div>
  )
}

export default PostsGridLayout