"use client";
import { Property } from '@/types/uploadTypes';
import { secondToTimeStringConversion } from '@/utils/dataManipulator';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface VideoEditorProps {
    files: File[];
    currentIdx: number;
    setThumbnailSrc: React.Dispatch<React.SetStateAction<string>>;
    setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setVideoStartingTime: React.Dispatch<React.SetStateAction<number>>;
    setVideoEndingTime: React.Dispatch<React.SetStateAction<number>>;
    setVideoCardCursorPosition: React.Dispatch<React.SetStateAction<number>>;
    videoCardCursorPosition: number;
    isVideoPlaying: boolean;
    leftTrimSeconds: number;
    setLeftTrimSeconds: React.Dispatch<React.SetStateAction<number>>
    rightTrimSeconds: number;
    setRightTrimSeconds: React.Dispatch<React.SetStateAction<number>>;
    setLeftTrimPosition: React.Dispatch<React.SetStateAction<number>>;
    leftTrimPosition: number;
    isVideoMuted: boolean;
    setIsVideoMuted: React.Dispatch<React.SetStateAction<boolean>>;
    propertyList: Property[]
}

const VideoEditorTools: React.FC<VideoEditorProps> = ({ files, currentIdx, setThumbnailSrc, setIsVideoPlaying, setVideoEndingTime, setVideoStartingTime, videoCardCursorPosition, setVideoCardCursorPosition, isVideoPlaying, leftTrimSeconds, rightTrimSeconds, setLeftTrimSeconds, setRightTrimSeconds, leftTrimPosition, setLeftTrimPosition, isVideoMuted, setIsVideoMuted, propertyList }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const cardVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [frames, setFrames] = useState<string[]>([]);
    const [xPostionOfVideo, setXPositionOfVideo] = useState<number>(0);
    const [currentCardVideoTime, setCurrentCardVideoTime] = useState<number>(0);
    const [videoCardDragging, setVideoCardDragging] = useState(false);
    const fiveCardsBoxRef = useRef<HTMLDivElement>(null);

    const [leftTrimCardDragging, setLeftTrimCardDragging] = useState(false);
    const [rightTrimCardDragging, setRightTrimCardDragging] = useState(false);

    const [rightTrimPosition, setRIghtTrimPosition] = useState<number>(292);
    const trimBoxCardsRef = useRef<HTMLDivElement>(null);
    const trimLeftRef = useRef<HTMLDivElement>(null);
    const trimRightRef = useRef<HTMLDivElement>(null);

    const [currentVideoDuration, setCurrentVideoDuration] = useState<number>(0);
    const [leftTrimTime, setLeftTrimTime] = useState<string>("00:00");
    const [rightTrimTime, setRightTrimTime] = useState<string>("00:00");


    const handleMouseMoveTrim = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const containerRect = trimBoxCardsRef.current?.getBoundingClientRect();
        if (!containerRect)
            return;
        const newPosition = e.clientX - containerRect.left;
        if (newPosition >= 0 && newPosition <= 292) {
            if (leftTrimCardDragging) {
                setLeftTrimPosition((prev) => {
                    if (leftTrimPosition > newPosition || leftTrimPosition < rightTrimPosition)
                        return newPosition
                    return prev;
                });
            } else if (rightTrimCardDragging) {
                setRIghtTrimPosition((prev) => {
                    if (rightTrimPosition < newPosition || leftTrimPosition < rightTrimPosition)
                        return newPosition
                    return prev;
                });
            }
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setVideoCardDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!videoCardDragging) return;
        const containerRect = fiveCardsBoxRef?.current?.getBoundingClientRect();
        if (containerRect) {
            const newPosition = e.clientX - containerRect.left - 30;
            console.log(newPosition);
            if (newPosition >= 0 && newPosition <= 270) {
                if (newPosition > 239)
                    setXPositionOfVideo(239);
                else
                    setXPositionOfVideo(newPosition);
            };
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        setVideoCardDragging(false);
        setLeftTrimCardDragging(false);
        setRightTrimCardDragging(false);
    };

    const extractThumbnail = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || files.length === 0) return;

        if (frames.length === 0)
            return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = 1080;
        canvas.height = 1920;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        const file = files[currentIdx];
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = async () => {
            await video.play();
            video.pause();

            if (!currentCardVideoTime) {
                video.currentTime = 0;
            } else {
                video.currentTime = currentCardVideoTime;
            }

            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            setThumbnailSrc(canvas.toDataURL('image/png'));
        };
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [files, currentIdx, currentCardVideoTime, setThumbnailSrc, frames]);

    const extractFrames = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || files.length === 0) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = 1080;
        canvas.height = 1920;
        const context = canvas.getContext('2d');

        if (!context) return;

        const file = files[currentIdx];
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = async () => {
            await video.play();
            video.pause();

            const frameImages: string[] = [];
            const interval = video.duration / 5;

            video.currentTime = 0;
            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            frameImages.push(canvas.toDataURL('image/png'));

            for (let i = 1; i < 4; i++) {
                video.currentTime = interval * i;
                await new Promise((resolve) => setTimeout(resolve, 300));

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                frameImages.push(canvas.toDataURL('image/png'));
            };

            video.currentTime = video.duration;
            await new Promise((resolve) => setTimeout(resolve, 300));
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            frameImages.push(canvas.toDataURL('image/png'));
            console.log({ frameImages });
            setFrames(frameImages);
        };
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [files, currentIdx]);

    useEffect(() => {
        setVideoCardCursorPosition(leftTrimPosition);
        setIsVideoPlaying(true);
    }, [leftTrimPosition, setIsVideoPlaying, setVideoCardCursorPosition]);

    useEffect(() => {
        setIsVideoPlaying(true);
    }, [rightTrimPosition, setIsVideoPlaying]);

    useEffect(() => {
        const time = Math.floor((leftTrimPosition / 291) * currentVideoDuration);
        setLeftTrimSeconds(time);
    }, [leftTrimPosition, currentVideoDuration, setLeftTrimSeconds]);

    useEffect(() => {
        const stringTime = secondToTimeStringConversion(leftTrimSeconds);
        setLeftTrimTime(stringTime);
    }, [leftTrimSeconds]);

    useEffect(() => {
        setVideoStartingTime(leftTrimSeconds);
    }, [leftTrimSeconds, setVideoStartingTime]);

    useEffect(() => {
        const time = Math.floor((rightTrimPosition / 291) * currentVideoDuration);
        setRightTrimSeconds(time);
    }, [rightTrimPosition, currentVideoDuration, setRightTrimSeconds]);

    useEffect(() => {
        const stringTime = secondToTimeStringConversion(rightTrimSeconds);
        setRightTrimTime(stringTime);
    }, [rightTrimSeconds]);

    useEffect(() => {
        setVideoEndingTime(rightTrimSeconds);
    }, [rightTrimSeconds, setVideoEndingTime]);

    useEffect(() => {
        if (cardVideoRef.current && currentCardVideoTime)
            cardVideoRef.current.currentTime = currentCardVideoTime;
    }, [currentCardVideoTime]);

    useEffect(() => {
        const currentTimeChangerOfVideo = () => {
            if (!cardVideoRef.current)
                return;
            setCurrentCardVideoTime(Math.floor((xPostionOfVideo / 239) * cardVideoRef.current.duration));
        };
        currentTimeChangerOfVideo();
    }, [xPostionOfVideo]);

    useEffect(() => {
        extractThumbnail();
    }, [extractThumbnail]);

    useEffect(() => {
        extractFrames();
    }, [extractFrames]);

    useEffect(() => {
        if (files.length === 0)
            return;
        if (!cardVideoRef.current)
            return;
        const url = URL.createObjectURL(files[currentIdx]);
        cardVideoRef.current.src = url;
        cardVideoRef.current.onloadedmetadata = async () => {
            const video = cardVideoRef.current;
            if (!video)
                return;
            setCurrentVideoDuration(video.duration);
        }
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [files, currentIdx, cardVideoRef]);

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    return (
        <div className='w-full border-l h-[72dvh] border-[#454545] rounded-br-xl px-5 flex flex-col bg-[#232323]' >
            {/* thumbnail component */}
            <div className="pt-7 flex justify-between items-center">
                <div className="font-bold text-base">Cover photo</div>
                <button className="text-[#0095f6]">Select from computer</button>
            </div>
            <div className='flex justify-center pt-5'>
                <video ref={videoRef} className='hidden' />
                <canvas ref={canvasRef} width="1080" height="1920" className='hidden' />
                {
                    <div className='relative rounded-md '>
                        <div
                            ref={fiveCardsBoxRef}
                            className='flex flex-wrap w-[300px]'
                            onMouseMove={handleMouseMove}
                        >
                            {
                                frames.map((frame, index) => (
                                    <div key={index}  >
                                        <Image
                                            width={1080}
                                            height={1920}
                                            className={`w-[60px] h-[96px] ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md" : ""}`}
                                            src={frame}
                                            alt={`Frame ${index}`} />
                                    </div>
                                ))
                            }
                            {
                                frames.length === 0 && <div className="h-[96px]">&nbsp;</div>
                            }
                        </div>
                        <div className="absolute top-0 left-0 z-10 w-[60px] h-[96px] border border-[#fff] rounded-md shadow cursor-grab"
                            style={{
                                left: `${xPostionOfVideo}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                        >
                            <video ref={cardVideoRef} className='w-full h-full rounded-md object-cover' />
                        </div>
                    </div>
                }
            </div>

            {/* trim component */}
            <div className="pt-7 flex items-center">
                <div className="font-bold text-base">Trim video</div>
            </div>
            <div className='flex justify-center pt-5'>
                {
                    <div className='relative rounded-md '>
                        <div
                            ref={trimBoxCardsRef}
                            className='flex flex-wrap w-[300px]'
                            onMouseMove={handleMouseMoveTrim}
                        >
                            {frames.length > 0 ?
                                frames.map((frame, index) => (
                                    <div key={index}  >
                                        <Image
                                            width={1080}
                                            height={1920}
                                            className={`w-[60px] h-[72px] ${index === 0 ? "rounded-l-md" : ""} ${index === 4 ? "rounded-r-md" : ""}`}
                                            src={frame}
                                            alt={`Frame ${index}`} />
                                    </div>
                                )) : <div className='h-[72px]'>&nbsp;</div>}
                        </div>
                        <div
                            className="absolute top-0 left-0 z-10 w-[0px] h-[72px] 
                            bg-[#232323aa] rounded-l-md shadow"
                            style={{
                                width: `${leftTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                        {
                            leftTrimCardDragging &&
                            <div className="absolute -top-5 left-0 z-10 text-sm text-[#dedede] ease-in-out" style={{
                                left: `${leftTrimPosition}px`
                            }}>
                                {leftTrimTime}
                            </div>
                        }
                        <div
                            ref={trimLeftRef}
                            className="absolute top-0 left-0 z-10 w-[8px] h-[72px] 
                            bg-[#dedede] rounded-l-xl shadow cursor-ew-resize 
                            flex items-center justify-center"
                            style={{
                                left: `${leftTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={
                                (e) => {
                                    e.preventDefault();
                                    setLeftTrimCardDragging(true);
                                    setRightTrimCardDragging(false);
                                }
                            }
                            onMouseMove={handleMouseMoveTrim}
                        >
                            <div className="h-[36px] rounded-sm w-[2px] bg-[#232323]">&nbsp;</div>
                        </div>
                        <div
                            ref={trimRightRef}
                            className="absolute top-0 right-0 z-10 w-[8px] h-[72px] 
                            bg-[#dedede] rounded-r-xl shadow cursor-ew-resize 
                            flex items-center justify-center"
                            style={{
                                left: `${rightTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseDown={
                                (e) => {
                                    e.preventDefault();
                                    setRightTrimCardDragging(true);
                                    setLeftTrimCardDragging(false);
                                }
                            }
                            onMouseMove={handleMouseMoveTrim}
                        >
                            <div className="h-[36px] rounded-sm w-[2px] bg-[#232323]">&nbsp;</div>
                        </div>
                        {
                            rightTrimCardDragging &&
                            <div className="absolute -top-5 right-0 z-10 text-sm text-[#dedede] ease-in-out" style={{
                                left: `${rightTrimPosition}px`
                            }}>
                                {rightTrimTime}
                            </div>
                        }
                        <div
                            className="absolute top-0 right-0 z-10 w-[0px] h-[72px] 
                             bg-[#232323aa] rounded-r-md shadow"
                            style={{
                                width: `${292 - rightTrimPosition}px`,
                                transition: "ease-in-out"
                            }}
                            onMouseMove={handleMouseMoveTrim}
                        >
                            &nbsp;
                        </div>
                        {
                            isVideoPlaying &&
                            <div className="absolute w-[4px] h-[80px] -top-1 rounded-xl bg-[#fff]"
                                style={{
                                    left: `${videoCardCursorPosition}px`
                                }}
                            >
                                &nbsp;
                            </div>
                        }
                    </div>
                }
            </div>

            <div className="pt-3 flex justify-center">
                <div className="flex justify-between w-[300px]">
                    <div className="flex flex-col gap-3 items-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#efefef]">&nbsp;</div>
                        <div className="text-[#898989] text-sm">0s</div>
                    </div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="flex flex-col gap-3 items-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#efefef]">&nbsp;</div>
                        <div className="text-[#898989] text-sm">{Math.floor(currentVideoDuration) / 2}s</div>
                    </div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#898989]">&nbsp;</div>
                    <div className="flex flex-col gap-3 items-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#efefef]">&nbsp;</div>
                        <div className="text-[#898989] text-sm">{Math.floor(currentVideoDuration)}s</div>
                    </div>
                </div>
            </div>

            <div className="pt-7 flex justify-between items-center">
                <div className="">Sound Off</div>
                <div className="">
                    <label className="switch">
                        <input type="checkbox" checked={isVideoMuted} onChange={
                            (e) => {
                                setIsVideoMuted(e.target.checked);
                            }} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

        </div >
    );
};

export default VideoEditorTools;