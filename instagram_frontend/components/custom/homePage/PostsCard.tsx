"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ConicalRainbowCircle from '../common/Canvas';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";

interface PostCardProps {
    url: string,
    videoPlaying: boolean,
    setVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const PostsCard: React.FC<PostCardProps> = ({ url, videoPlaying, setVideoPlaying }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoBoxRef = useRef<HTMLDivElement | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentVal, setCommentVal] = useState<string>("");
    const [isVideoPause, setIsVideoPause] = useState<boolean>(false);

    const handleVidoSwitchOnAndOff = () => {
        if (videoBoxRef.current && !videoBoxRef.current.classList.contains("sound-icon")) {
            isVideoPause ? videoRef?.current?.play() : videoRef?.current?.pause();
            setIsVideoPause((prev) => !prev);
        }
    }

    useEffect(() => {

        const video = videoRef.current;
        if (!videoRef.current) return;
        videoRef.current.muted = true;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoRef?.current?.play();
                } else {
                    videoRef?.current?.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        });

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, [videoRef, url]);

    useEffect(() => {
        if (videoRef?.current)
            videoRef.current.muted = videoPlaying;
    }, [videoRef, videoPlaying]);

    useEffect(() => {
        if (commentInputRef.current) {
            commentInputRef.current.style.height = "auto";
            commentInputRef.current.style.height = commentInputRef?.current?.scrollHeight + "px";
        }
    }, [commentVal]);

    return (
        <div className=" min-h-[100dvh] flex flex-col gap-2 border-b border-[#dedede] border-opacity-20 mb-4 pb-4">
            {/* profile bar */}
            <div className='flex justify-between items-center'>
                <div className="flex gap-3 items-center">
                    <div className="w-[50px] flex flex-col items-center cursor-pointer relative">
                        <div className='absolute -z-10 right-[2px] -top-[3px]'>
                            {/* <ConicalRainbowCircle width={46} height={46} /> */}
                        </div>
                        <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt='profile' className='rounded-full w-[40px] h-[40px] border-[3px] border-[#121212cc]' />
                    </div>
                    <div>
                        <div className="cursor-pointer text-[14px] font-medium flex gap-1">
                            <div className="">7billionairesline</div>
                            <div className="">•</div>
                            <div className="text-[#dedede88]">3w</div>
                            <div className="">•</div>
                            <div className="text-[#0095f6]">Follow</div>
                        </div>
                        <div className="text-xs text-[#dedede] text-opacity-60 cursor-default">original audio</div>
                    </div>
                </div>
                <button className='text-xl py-2 px-2 hover:text-[#898989] hover:font-bold text-[#dedede]'>
                    <IoEllipsisHorizontal />
                </button>
            </div>

            {/* video component */}
            <div className="relative" onClick={handleVidoSwitchOnAndOff} ref={videoBoxRef}>
                <video className="h-[75dvh] w-full object-contain border border-[#dedede22] rounded-md" ref={videoRef} muted src={url} loop>
                </video>
                <button className="sound-icon absolute bottom-2 right-2 bg-[#232323] p-2 text-lg rounded-full hover:shadow-md hover:shadow-[#343434]" onClick={(event) => {
                    setVideoPlaying((prev) => !prev)
                    event.stopPropagation();
                }}>
                    {
                        videoPlaying ? <RxSpeakerOff /> : <RxSpeakerLoud />
                    }
                </button>
                <button className="sound-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] p-5" onClick={(event) => {
                    handleVidoSwitchOnAndOff();
                    event.stopPropagation();
                }}>
                    <div className="rounded-full bg-[#23232333] hover:shadow-sm hover:shadow-[#343434]">
                    {
                        isVideoPause ? <FaPause className=" p-5 "/> : ""
                    }
                    </div>
                </button>
            </div>

            {/* comments section */}
            <div className="flex flex-col gap-2">
                {/* icons */}
                <div className="flex text-2xl justify-between">
                    <div className="flex gap-3">
                        <button><FaRegHeart /></button>
                        <button><RiMessengerLine /></button>
                        <button><FiSend /></button>
                    </div>
                    <div className="">
                        <button><FaRegBookmark /></button>
                    </div>
                </div>

                <div className="font-medium text-sm">
                    271,906 likes
                </div>

                <div className="font-medium text-sm flex">
                    <span className="break-all line-clamp-1 text-[#dedede] text-opacity-90"><span className="text-[#dedede] text-opacity-100 font-semibold">7billionairesline</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit dignissim sodales ut eu sem integer vitae. Vitae nunc sed velit dignissim sodales ut eu. Tellus in metus vulputate eu. Placerat vestibulum lectus mauris ultrices eros. Maecenas ultricies mi eget mauris pharetra. Volutpat odio facilisis mauris sit amet massa vitae. Vestibulum sed arcu non odio euismod lacinia. Eget arcu dictum varius duis at. Eget velit aliquet sagittis id consectetur purus ut faucibus. Nisi vitae suscipit tellus mauris a diam maecenas sed. Quam adipiscing vitae proin sagittis nisl. Adipiscing commodo elit at imperdiet dui accumsan sit. Phasellus egestas tellus rutrum tellus. Odio tempor orci dapibus ultrices. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Ut porttitor leo a diam. Aliquam sem fringilla ut morbi tincidunt augue interdum velit.</span>
                </div>

                <div className="font-medium text-sm text-[#dedede] text-opacity-60 cursor-pointer">
                    View All 1000 Comments
                </div>

                <div className="font-medium text-sm flex items-end">
                    <textarea value={commentVal} onChange={(e) => setCommentVal(e.target.value)} placeholder="Add a comment..." className="w-full outline-none resize-none" rows={1} ref={commentInputRef} />
                    {
                        commentVal === "" ? "" : <button className="text-[#0095f6] hover:text-[#dedede] hover:text-semibold">Post</button>
                    }
                </div>

            </div>

        </div>
    )
}

export default PostsCard