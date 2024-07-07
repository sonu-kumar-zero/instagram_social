"use client";
import { useUserState } from '@/context/userContext';
import { Property } from '@/types/uploadTypes';
import { handlePostUpload } from '@/utils/apiCallHalder';
import Image from 'next/image';
import React, { useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import EmojiBoard from '../common/EmojiBoard';

interface PostUploaderToolsProps {
    files: File[];
    propertyList: Property[];
    setIsUploadingStart: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostUploaderTools: React.FC<PostUploaderToolsProps> = ({ files, propertyList, setIsUploadingStart, setUploadBoxEnabled }) => {
    const userState = useUserState();
    const user = userState ? userState.user : null;

    const [postDescription, setPostDescription] = useState("");
    const [isEmojiBoardOpen, setIsEmojiBoardOpen] = useState(false);

    return (
        <>
            <div className="px-5 rounded-br-xl border-l border-[#454545]">
                <div className="flex py-3 gap-2 items-center">
                    <Image src={user ? `http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/300_300.jpg` : "/images/sonu_profile.jpeg"} alt='profile_icon' width={100} height={100} className='w-[30px] h-[30px] object-cover rounded-full' />
                    <div className="text-sm font-semibold">{user ? user.userName : "userName"}</div>
                </div>
                <textarea value={postDescription} onChange={
                    (e) => {
                        setPostDescription(e.target.value);
                    }
                } rows={6} placeholder={"Write a caption..."} className='outline-none bg-transparent w-full resize-none text-sm text-[#dedede]' />
                <div className="py-2 relative flex justify-between text-sm text-[#676767] items-center">
                    <>
                        <GrEmoji className="cursor-pointer" size={28} onClick={
                            () => {
                                setIsEmojiBoardOpen(true);
                            }
                        } />
                        {
                            isEmojiBoardOpen &&
                            <div className='absolute top-0 z-10'>
                                <EmojiBoard setIsEmojiBoardOpen={setIsEmojiBoardOpen} setUserCommentString={setPostDescription} />
                            </div>
                        }
                    </>
                    <div className="text-sm text-[#676767]">
                        {postDescription.length}/2200
                    </div>
                </div>
                <div className="text-lg font-semibold py-2">Advanced Settings</div>
                <div className="flex gap-3 pb-1 items-center justify-between">
                    <div className="font-medium">
                        Hide like and view Counts on this post
                    </div>
                    <div className="">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="text-xs text-[#676767] ">
                    Only you will see the total number of likes and views on this post. You can change this later by going to ... menu at the top of post. To hide like counts on other people&apos;s posts,go to your account settings.
                </div>
                <div className="flex gap-3 pt-3 pb-1 items-center justify-between">
                    <div className="font-medium">
                        Turn off commenting
                    </div>
                    <div className="">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="text-xs text-[#676767]  ">
                    You can change this later by going to the ... menu at the top of your post.
                </div>
                <div className="flex justify-end py-5">
                    <button
                        className='bg-[#0095f6] px-5 py-2 rounded-xl'
                        onClick={
                            () => {
                                handlePostUpload({ user, files, propertyList, postDescription, setIsUploadingStart, setUploadBoxEnabled });
                            }
                        }>
                        Upload Post
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostUploaderTools
