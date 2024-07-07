"use client";
import { Property } from '@/types/uploadTypes';
import React, { useEffect, useRef, useState } from 'react';

interface ImagePosterProps {
  file: File;
  propertyList: Property[];
  index: number;
}

const ImagePoster: React.FC<ImagePosterProps> = ({ file, propertyList, index }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (index >= propertyList.length)
      return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video)
      return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx)
      return;
    const url = URL.createObjectURL(file);
    if (propertyList[index].type === "IMAGE") {
      const img = new Image();
      canvas.width = 96;
      canvas.height = 96;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.src = url;
    } else if (propertyList[index].type === "VIDEO") {
      video.src = url;
      canvas.width = 96;
      canvas.height = 96;
      video.onloadedmetadata = async () => {
        await video.play();
        video.pause();
        video.currentTime = 0;
        await new Promise((resolve) => setTimeout(resolve, 300));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
    return () => {
      URL.revokeObjectURL(url);
    }
  }, [file, index, propertyList]);

  return (
    <>
      <div className="w-[96px] h-[96px] rounded-md flex justify-center">
        <video ref={videoRef} hidden />
        <canvas ref={canvasRef} className="rounded-md" />
      </div>
    </>
  )
}

interface ImageAddOnProps {
  setOpenImageAddON: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  propertyList: Property[];
  openMediaInputBox: () => void;
}

const ImageAddOn: React.FC<ImageAddOnProps> = ({ files, setOpenImageAddON, propertyList, openMediaInputBox }) => {
  const imageAddOnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      const current = imageAddOnRef.current;
      if (current && !current.contains(e.target)) {
        setOpenImageAddON(false);
      };
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [setOpenImageAddON]);

  return (
    <>
      <div className="px-3 bg-[#232323aa] max-w-[500px] rounded-md">
        <div className='flex gap-3 py-3 overflow-y-scroll remove_scroll_bar' ref={imageAddOnRef}>
          {
            files.map((file, index) => {
              return <ImagePoster file={file} key={index} propertyList={propertyList} index={index} />
            })
          }
          <div className="h-[96px] flex items-center">
            <button type='button' className="p-5 rounded-full border border-[#565656]" onClick={(e) => {
              e.preventDefault();
              openMediaInputBox();
            }}>
              <svg aria-label="Plus icon" fill="currentColor" height="22" role="img" viewBox="0 0 24 24" width="22">
                <title>Plus icon</title>
                <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageAddOn
