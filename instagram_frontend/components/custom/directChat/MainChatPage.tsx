"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import EmojiBoard from '@/components/custom/common/EmojiBoard';

const MainChatPage = () => {
    const [isEmojiBoardOpen, setIsEmojiBoardOpen] = useState<boolean>(false);
    const [userMessage, setUserMessage] = useState<string>("");
    const userMessageInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (userMessageInputRef.current) {
            userMessageInputRef.current.style.height = "auto";
            userMessageInputRef.current.style.height = userMessageInputRef?.current?.scrollHeight + "px";
        }
    }, [userMessage]);


    return (
        <>
            <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-y-scroll flex flex-col justify-between">
                {/* profile bar */}
                <div className="">
                    <div className="h-[90px] px-5 border-b border-[#343434] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="">
                                <Image src={"/images/sonu_profile.jpeg"} alt='profile' width={100} height={100} className='w-[60px] h-[60px] object-cover rounded-full' />
                            </div>
                            <div className="">Starksonu12</div>
                        </div>
                        <div className="">
                            <svg aria-label="Conversation information" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <title>Conversation information</title>
                                <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                <circle cx="11.819" cy="7.709" r="1.25"></circle>
                                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line>
                                <polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="max-h-[calc(100%-180px)] bg-yellow-500 overflow-y-scroll"></div>
                </div>
                <div className="min-h-[90px] px-5 flex items-center pb-2">
                    <div className="rounded-[50px] border border-[#343434] relative flex p-5 w-full justify-between max-h-[300px] overflow-y-scroll remove_scroll_bar">
                        <div className="flex gap-3 w-full pr-3 items-center">
                            <div className="">
                                <GrEmoji className="cursor-pointer" size={28} onClick={
                                    () => {
                                        setIsEmojiBoardOpen(true);
                                    }
                                } />
                                {
                                    isEmojiBoardOpen &&
                                    <div className='absolute bottom-16'>
                                        <EmojiBoard setIsEmojiBoardOpen={setIsEmojiBoardOpen} setUserCommentString={setUserMessage} />
                                    </div>
                                }
                            </div>
                            <textarea ref={userMessageInputRef} name="" id="" className='w-full outline-none resize-none text-sm' rows={1} value={userMessage} onChange={
                                (e) => {
                                    setUserMessage(e.target.value);
                                }
                            } placeholder={"Message..."}></textarea>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="">
                                <svg aria-label="Voice Clip" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Voice Clip</title>
                                    <path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8.706" x2="15.104" y1="22" y2="22"></line>
                                    <path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                </svg>
                            </div>
                            <div className="">
                                <svg aria-label="Add Photo or Video" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Add Photo or Video</title>
                                    <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fill-rule="evenodd"></path>
                                    <path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2">
                                    </path>
                                    <path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                </svg>
                            </div>
                            <div className="">
                                <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Like</title>
                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainChatPage
