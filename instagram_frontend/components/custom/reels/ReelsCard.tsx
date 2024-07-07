"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FaPlay, FaPause, FaRegHeart, FaRegBookmark, FaMusic } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoEllipsisHorizontal, IoPerson } from "react-icons/io5";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { ReelType, UserType } from "@/types/modelsTypes";
import ReactPlayer from "react-player";
import axios from "axios";
import { BookMarkComponent } from "../common/PostDisplayer";
import ReelsCommentContainer from "./ReelsCommentContainer";

interface VideoFrameProps {
    url: string;
    videoPlaying: boolean;
    audioPlaying: boolean;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ url, videoPlaying, audioPlaying }) => {

    return (
        <>
            <div className="min-w-[50dvh] max-w-[54dvh] h-[95dvh]">
                {
                    <ReactPlayer
                        url={url}
                        playing={videoPlaying}
                        width="100%"
                        height="95dvh"
                        muted={!audioPlaying}
                        loop={true}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'anonymous'
                                }
                            }
                        }}
                    />
                }
            </div>
        </>
    )
};

interface ReelLikeComponentProps {
    reel: ReelType;
    user: UserType | null;
}

const ReelLikeComponent: React.FC<ReelLikeComponentProps> = ({ reel, user }) => {
    const [isLikeDoneByUserOnThisReel, setIsLikeDoneByUserOnThisReel] = useState<boolean>(false);

    const fetchLikeStatusOnThisReel = useCallback(async () => {
        try {
            if (!user || !reel)
                return;
            const fetchLikeStatusOnThisReelResponse = await axios.get(
                `http://localhost:4000/api/upload/reel/like/reel/${user.id}/${reel.id}`
            );
            if (fetchLikeStatusOnThisReelResponse.status === 200)
                setIsLikeDoneByUserOnThisReel(fetchLikeStatusOnThisReelResponse.data.like);
        } catch (error) {
            console.log(error);
        }
    }, [user, reel]);

    const toggleLikeOnThisPost = async () => {
        try {
            if (!user || !reel)
                return;

            const toggleLikeOnThisPostResponse = await axios.post(
                `http://localhost:4000/api/upload/reel/like/reel/${user.id}/${reel.id}`
            );
            if (toggleLikeOnThisPostResponse.status === 200)
                fetchLikeStatusOnThisReel();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchLikeStatusOnThisReel();
    }, [fetchLikeStatusOnThisReel]);

    return (
        <>
            <button className="flex flex-col items-center"
                onClick={
                    () => {
                        toggleLikeOnThisPost();
                    }
                }>
                {
                    isLikeDoneByUserOnThisReel ?
                        <svg aria-label="Unlike" fill="#ff0000" height="24" role="img" viewBox="0 0 48 48" width="24">
                            <title>Unlike</title>
                            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                        :
                        <svg aria-label="Like" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Like</title>
                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                        </svg>
                }
                <span className="text-xs">{reel.likesCount}</span>
            </button>
        </>
    )
}

interface ReelCommentComponentProps {
    reel: ReelType;
    user: UserType | null;
}

const ReelCommentComponent: React.FC<ReelCommentComponentProps> = ({ reel, user }) => {
    const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);
    return (
        <>
            <div className="relative">
                <button className="flex flex-col items-center" onClick={
                    () => {
                        setCommentBoxOpen(true);
                    }}>
                    <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Comment</title>
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                    <span className="text-xs">{reel.commentCount}</span>
                </button>
                {
                    commentBoxOpen &&
                    <div className="absolute left-12 bottom-0">
                        <ReelsCommentContainer setCommentBoxOpen={setCommentBoxOpen} reel={reel} user={user}/>
                    </div>
                }
            </div>
            
        </>
    )
}

interface ReelsCardProps {
    user: UserType | null;
    audioPlaying: boolean;
    setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    reel: ReelType;
}

const ReelsCard: React.FC<ReelsCardProps> = ({ audioPlaying, setAudioPlaying, reel, user }) => {

    const videoRef = useRef<HTMLDivElement | null>(null);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(true);

    const handleVidoSwitchOnAndOff = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target?.classList.contains("video_overlay_layer")) {
            setVideoPlaying((prev) => !prev);
        }
    }

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVideoPlaying(prev => prev !== true ? true : prev); // Only update if the state changes
                } else {
                    setVideoPlaying(prev => prev !== false ? false : prev); // Only update if the state changes
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            threshold: 0.5,
        });

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);


    return <>
        <div className="h-[95dvh] w-fit relative rounded-xl snap-center">
            {/* video component */}
            <div className=" w-fit h-[95dvh] max-h-[95dvh] rounded-lg brightness-95" ref={videoRef}>
                {
                    <VideoFrame
                        url={`http://127.0.0.1:8000/uploads/reels/${reel.url}/index.m3u8`} videoPlaying={videoPlaying}
                        audioPlaying={audioPlaying} />
                }
            </div>

            {/* thumbnail component */}
            <Image src={`http://127.0.0.1:8000/uploads/thumbnails/${reel.url}/1080_1920.jpg`} className="w-full h-[95dvh] absolute top-0 left-0 blur-[16px] -z-10 brightness-80" width={1080} height={1920} alt="blur_post_thumbnail" />

            {/* extra feauture buttons */}
            <div className="flex flex-col gap-4 absolute bottom-0 -right-14 items-center text-xl">
                <ReelLikeComponent reel={reel} user={user} />
                <ReelCommentComponent reel={reel} user={user} />
                {/* <button>
                    <FiSend size={28} />
                </button> */}
                <BookMarkComponent user={user} post={reel.post} />
                <button>
                    <IoEllipsisHorizontal size={28} />
                </button>
                <Image src={`http://127.0.0.1:8000/uploads/profile/${reel.post.user.imageUrl}/100_100.jpg`} width={30} height={30} alt="music_icon" className="w-[30px] h-[30px] rounded object-cover" />
            </div>

            {/* video overlay layer */}
            <div className="w-full h-full p-3 flex flex-col justify-between absolute top-0 left-0 video_overlay_layer bg-[#12121255]" onClick={(e) => {
                handleVidoSwitchOnAndOff(e);
                e.stopPropagation();
            }}>
                <div className="w-full flex justify-end">
                    <button className="bg-[#dedede33] p-2 rounded-full hover:bg-[#dedede66]" onClick={() => setAudioPlaying(prev => !prev)}>
                        {
                            !audioPlaying ?
                                <RxSpeakerOff size={24} /> :
                                <RxSpeakerLoud size={24} />
                        }
                    </button>
                </div>
                {
                    !videoPlaying ?
                        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 video_overlay_layer" onClick={(e) => {
                            handleVidoSwitchOnAndOff(e);
                            e.stopPropagation();
                        }}>
                            <div className="bg-[#dedede33] rounded-full p-3 h-fit">
                                <FaPause size={60} />
                            </div>
                        </div> : <></>
                }
                <div className="w-full flex flex-col gap-3 p-3">
                    <div className="flex gap-3 items-center">
                        <Image src={`http://127.0.0.1:8000/uploads/profile/${reel.post.user.imageUrl}/100_100.jpg`} className="w-[40px] h-[40px] rounded-full" width={40} height={40} alt="user_profile_img" />
                        <span className=" text-sm">{reel.post.user.userName}</span>
                        <span>•</span>
                        <button className="border border-[#dedede] border-opacity-20 rounded-xl hover:from-pink-500 hover:to-yellow-500 px-2 hover:bg-gradient-to-r">Follow</button>
                    </div>
                    <div className="text-sm flex gap-1 w-2/3">
                        <span className="truncate">{reel.post.description}</span>
                        <button className="text-[#dedede] text-sm">...&nbsp;more</button>
                    </div>
                    <div className="w-3/4 flex text-xs items-center gap-2">
                        <FaMusic />
                        <span className="truncate">Space Song Beach House</span>
                        <span className="flex items-center gap-2">
                            <IoPerson />
                            {reel.post.user.userName}
                        </span>
                    </div>
                </div>
            </div>


        </div>
    </>
};


export default ReelsCard