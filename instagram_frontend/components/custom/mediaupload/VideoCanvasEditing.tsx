"use client";
import React, { useEffect, useRef, useState } from 'react'
import VideoEditorTools from './VideoEditorTools'
import Image from 'next/image';
import { Property } from '@/types/uploadTypes';

interface VideoCanvasEditingProps {
  files: File[];
  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  setPropertList: React.Dispatch<React.SetStateAction<Property[]>>;
  propertList: Property[]
}


const VideoCanvasEditing: React.FC<VideoCanvasEditingProps> = (
  {
    files, currentIdx, setCurrentIdx, setPropertList, propertList
  }
) => {
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");
  const [videoStartingTime, setVideoStartingTime] = useState<number>(0);
  const [videoEndingTime, setVideoEndingTime] = useState<number>(0);
  const [videoCardCursorPosition, setVideoCardCursorPosition] = useState<number>(0);
  const [leftTrimSeconds, setLeftTrimSeconds] = useState<number>(0);
  const [rightTrimSeconds, setRightTrimSeconds] = useState<number>(0);
  const [leftTrimPosition, setLeftTrimPosition] = useState<number>(0);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  useEffect(() => {
    const video = currentVideoRef.current;
    if (!video) {
      return;
    };
    video.onloadedmetadata = async () => {
      setRightTrimSeconds(Math.floor(video.duration));
    }
  }, []);

  useEffect(() => {
    setPropertList((prev) => {
      return prev.map((property, idx) => {
        if (idx === currentIdx) {
          return {
            ...property,
            VIDEO_DEFAULT_OPTIONS: {
              ...prev[idx].VIDEO_DEFAULT_OPTIONS, videoMuted: isVideoMuted
            }
          };
        }
        return property;
      });
    })
  }, [currentIdx, isVideoMuted, setPropertList]);

  useEffect(() => {
    setPropertList((prev) => {
      return prev.map((property, idx) => {
        if (idx === currentIdx) {
          return {
            ...property,
            VIDEO_DEFAULT_OPTIONS: {
              ...prev[idx].VIDEO_DEFAULT_OPTIONS, endTime: rightTrimSeconds
            }
          };
        }
        return property;
      });
    })
  }, [currentIdx, rightTrimSeconds, setPropertList]);

  useEffect(() => {
    setPropertList((prev) => {
      return prev.map((property, idx) => {
        if (idx === currentIdx) {
          return {
            ...property,
            VIDEO_DEFAULT_OPTIONS: {
              ...prev[idx].VIDEO_DEFAULT_OPTIONS, startTime: leftTrimSeconds
            }
          };
        }
        return property;
      });
    })
  }, [currentIdx, leftTrimSeconds, setPropertList]);

  useEffect(() => {
    setPropertList((prev) => {
      return prev.map((property, idx) => {
        if (idx === currentIdx) {
          return {
            ...property,
            VIDEO_DEFAULT_OPTIONS: {
              ...prev[idx].VIDEO_DEFAULT_OPTIONS, imageUrl: thumbnailSrc
            }
          };
        }
        return property;
      });
    })
  }, [currentIdx, thumbnailSrc, setPropertList]);

  useEffect(() => {
    if (!currentVideoRef.current)
      return;
    if (isVideoPlaying) {
      currentVideoRef.current.currentTime = videoStartingTime;
      currentVideoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error);
      });
    } else {
      currentVideoRef.current.pause();
    }
  }, [isVideoPlaying, videoStartingTime]);

  useEffect(() => {
    const video = currentVideoRef.current;
    if (!video)
      return;
    video.muted = isVideoMuted;
  }, [isVideoMuted]);

  useEffect(() => {
    const video = currentVideoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const curPos = (Math.floor(video.currentTime) / video.duration) * 291;
      setVideoCardCursorPosition(curPos);
      if (Math.floor(video.currentTime) === videoEndingTime) {
        video.currentTime = videoStartingTime;
        setIsVideoPlaying(false);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoEndingTime, videoStartingTime, setIsVideoPlaying, leftTrimSeconds, leftTrimPosition]);

  useEffect(() => {
    if (!currentVideoRef.current || !files || files.length === 0) return;

    const url = URL.createObjectURL(files[currentIdx]);
    currentVideoRef.current.src = url;
    const video = currentVideoRef.current;
    video.onloadedmetadata = async () => {
      setVideoEndingTime(video.duration);
    }

    return () => {
      URL.revokeObjectURL(url);
    };
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
            files.length > 0 && !isVideoPlaying && thumbnailSrc !== "" && (
              <Image
                className="w-full h-full object-cover rounded-bl-xl cursor-pointer"
                alt='thumbnail'
                src={thumbnailSrc}
                width={1080}
                height={1920}
                onClick={() => setIsVideoPlaying(true)}
              />
            )
          }
        </div>
        {
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
          files &&
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
      <VideoEditorTools
        files={files}
        currentIdx={currentIdx}
        isVideoPlaying={isVideoPlaying}
        setThumbnailSrc={setThumbnailSrc}
        setIsVideoPlaying={setIsVideoPlaying}
        setVideoStartingTime={setVideoStartingTime}
        setVideoEndingTime={setVideoEndingTime}
        videoCardCursorPosition={videoCardCursorPosition}
        setVideoCardCursorPosition={setVideoCardCursorPosition}
        leftTrimSeconds={leftTrimSeconds}
        setLeftTrimSeconds={setLeftTrimSeconds}
        rightTrimSeconds={rightTrimSeconds}
        setRightTrimSeconds={setRightTrimSeconds}
        leftTrimPosition={leftTrimPosition}
        setLeftTrimPosition={setLeftTrimPosition}
        setIsVideoMuted={setIsVideoMuted}
        isVideoMuted={isVideoMuted}
        propertyList={propertList}
      />
    </>
  )
}

export default VideoCanvasEditing
