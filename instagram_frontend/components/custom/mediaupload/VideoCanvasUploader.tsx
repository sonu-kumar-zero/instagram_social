"use client";
import { Property } from '@/types/uploadTypes';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface VideoCanvasUploaderProps {
    files: File[];
    currentIdx: number;
    propertList: Property[];
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

const VideoCanvasUploader: React.FC<VideoCanvasUploaderProps> = ({ files, currentIdx, propertList, setCurrentIdx }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
    const currentVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = currentVideoRef.current;
        if (!video)
            return;
        if (isVideoPlaying) {
            video.currentTime = propertList[currentIdx].VIDEO_DEFAULT_OPTIONS.startTime;
            video.play().catch(e => {
                console.log(e.message);
            })
        } else {
            video.pause();
        }
    }, [currentIdx, isVideoPlaying, propertList]);

    useEffect(() => {
        const video = currentVideoRef.current;
        if (!video)
            return;

        const handleTimeUpdate = () => {
            if (Math.floor(video.currentTime) === propertList[currentIdx].VIDEO_DEFAULT_OPTIONS.endTime) {
                video.currentTime = propertList[currentIdx].VIDEO_DEFAULT_OPTIONS.endTime;
                setIsVideoPlaying(false);
            }
        }

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [currentIdx, propertList]);

    useEffect(() => {
        const video = currentVideoRef.current;
        if (!video || !files)
            return;
        const url = URL.createObjectURL(files[currentIdx]);
        video.src = url;
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [currentIdx, files]);

    return (
        <>
            <div className="relative">
                <div className="h-[72dvh] w-[580px] aspect-w-9 aspect-h-16 object-cover rounded-bl-xl" >
                    {
                        files.length > 0 && (
                            <video
                                className={`w-full h-full object-cover rounded-bl-xl ${isVideoPlaying ? '' : 'hidden'}`}
                                loop
                                ref={currentVideoRef}
                                onClick={() => setIsVideoPlaying(false)}
                            />
                        )
                    }
                    {
                        files.length > 0 && !isVideoPlaying && propertList[currentIdx].VIDEO_DEFAULT_OPTIONS.imageUrl !== null && (
                            <Image
                                className="w-full h-full object-cover rounded-bl-xl cursor-pointer"
                                alt='thumbnail'
                                src={propertList[currentIdx].VIDEO_DEFAULT_OPTIONS.imageUrl}
                                width={1080}
                                height={1920}
                                onClick={() => setIsVideoPlaying(true)}
                            />
                        )
                    }
                </div>
                {
                    files.length > 0 &&
                    currentIdx < files.length - 1 &&
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <button className='bg-[#121212aa] p-3 rounded-full' onClick={
                            () => setCurrentIdx((prev) => {
                                if (prev < files.length - 1) {
                                    return prev + 1;
                                };
                                return prev;
                            })}>
                            <svg aria-label="Right chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Right chevron</title><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                        </button>
                    </div>
                }
                {
                    files.length > 0 &&
                    currentIdx > 0 && currentIdx < files.length &&
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <button className='bg-[#121212aa] p-3 rounded-full' onClick={
                            () => setCurrentIdx((prev) => {
                                if (prev > 0) {
                                    return prev - 1;
                                };
                                return prev;
                            })}>
                            <svg aria-label="Left chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Left chevron</title><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default VideoCanvasUploader
