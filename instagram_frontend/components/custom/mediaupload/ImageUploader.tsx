"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageCanvas from "@/components/custom/mediaupload/ImageCanvas";
import ImageCanvasUploader from '@/components/custom/mediaupload/ImageCanvasUploader';
import { DEFAULT_OPTIONS } from '@/data/filtersList';
import ImageEditorTools from '@/components/custom/mediaupload/ImageEditorTools';
import VideoCanvasEditing from '@/components/custom/mediaupload/VideoCanvasEditing';
import { Property } from '@/types/uploadTypes';
import PostUploaderTools from '@/components/custom/mediaupload/PostUploaderTools';
import VideoCanvasUploader from './VideoCanvasUploader';
import ImageAddOn from './ImageAddOn';
import ZoomInputComponent from './ZoomInputComponent';
import FrontImageDisplayer from './FrontImageDisplayer';
import Image from 'next/image';

interface ImageUploaderProps {
    setUploadBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

interface VideoViewProps {
    files: File[];
    currentIdx: number;
};

const VideoView: React.FC<VideoViewProps> = ({ currentIdx, files }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (!videoRef.current || !files)
            return;
        const url = URL.createObjectURL(files[currentIdx]);
        videoRef.current.src = url;
        videoRef.current.onloadedmetadata = async () => {
            const video = videoRef.current;
            if (!video) return;
            await videoRef.current.play();
        }
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [currentIdx, videoRef, files]);


    return (
        <>
            {
                files.length > 0 &&
                <div className={`h-[72dvh] w-[580px] aspect-w-9 aspect-h-16 object-contain rounded-b-xl overflow-hidden zoomImage`}>
                    <video ref={videoRef} loop className="object-contain w-full h-full">
                    </video>
                </div>
            }
        </>
    )
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setUploadBoxEnabled }) => {
    const inputRef = useRef(null);
    const [canvasImageSrc, setCanvasImageSrc] = useState<string | ArrayBuffer | null | undefined>(null);
    const [mediaSelected, setMediaSelected] = useState(false);
    const [draggingStart, setDraggingStart] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [editingTool, setEditingTool] = useState(false);
    const [uploadingTool, setUploadingTool] = useState(false);
    const [openImageAddON, setOpenImageAddON] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [zoomValue, setZoomValue] = useState<number>(1);
    const [propertList, setPropertList] = useState<Property[]>([]);
    const [isUploadingStart, setIsUploadingStart] = useState<boolean>(false);

    const handleImageSelection = () => {
        const current = inputRef.current as HTMLInputElement | null;
        if (current) {
            setMediaSelected(true);
            setFiles(
                (prev) => {
                    if (current.files === null)
                        return [];
                    if (prev === null)
                        return Array.from(current.files);
                    return [...Array.from(prev), ...Array.from(current.files)]
                }
            )
        }
    };

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(true);
    };

    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(true);
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingStart(false);
        if (e.dataTransfer.files && !editingTool && !uploadingTool) {
            setMediaSelected(true);
            setFiles(() => Array.from(e.dataTransfer.files));
        };
    };

    function getMediaType(mediaType: string): string {
        if (mediaType.startsWith('video/'))
            return 'VIDEO';
        else if (mediaType.startsWith('image/'))
            return 'IMAGE';
        else
            return "";
    }

    const handleCleanUpOfAllMedia = () => {
        setFiles([]);
    };

    const openMediaInputBox = () => {
        const current = inputRef.current as HTMLInputElement | null;
        current?.click();
    }

    useEffect(() => {
        if (propertList.length > 0)
            setZoomValue((prev) => propertList[currentIdx].scale);
    }, [currentIdx, propertList]);

    useEffect(() => {
        if (files.length === 0) {
            setPropertList([]);
        }
    }, [files]);

    const initializePropertyList = useCallback((fileList: File[]) => {
        let cleanUpFire = false;
        fileList.map((file) => {
            const mediaType = getMediaType(file.type);
            if (mediaType === "") {
                cleanUpFire = true;
                handleCleanUpOfAllMedia();
            }
        });
        if (!cleanUpFire) {
            const newList = fileList.map((file) => {
                const mediaType = getMediaType(file.type);
                const VIDEO_DEFAULT_OPTIONS = {
                    imageUrl: "",
                    videoMuted: false,
                    startTime: 0,
                    endTime: 0
                }
                return {
                    scale: 1,
                    type: mediaType,
                    DEFAULT_OPTIONS: DEFAULT_OPTIONS,
                    VIDEO_DEFAULT_OPTIONS: VIDEO_DEFAULT_OPTIONS
                }
            });
            setPropertList(newList);
        }
    }, []);

    useEffect(() => {
        if (files.length > 0) {
            initializePropertyList(files);
        }
    }, [files, initializePropertyList]);

    useEffect(() => {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCanvasImageSrc(e.target?.result);
            };
            reader.readAsDataURL(files[currentIdx]);
        }
    }, [currentIdx, canvasImageSrc, files]);




    return (
        <>
            <div
                onDragOver={handleOnDragOver}
                onDrag={handleOnDrag}
                onDrop={handleOnDrop}
                className="absolute top-0 left-0 z-10 w-[100dvw] h-[100dvh] flex justify-center items-center bg-[#28282888]"
            >
                <form >
                    <label htmlFor='image_input'>
                    </label>

                    <input
                        name='image_input'
                        title="image_input"
                        ref={inputRef}
                        type='file'
                        accept="
                image/jpeg,
                image/png,
                image/heic,
                image/heif,
                video/mp4,
                video/quicktime"
                        hidden
                        multiple
                        onChange={handleImageSelection}
                    />
                </form>
                <div
                    className={`bg-[#282828] w-[90dvw] ${editingTool || uploadingTool ? "max-w-[950px]" : "max-w-[580px]"} h-[78dvh] rounded-xl flex flex-col`}
                >
                    <div className="w-full h-[6dvh] text-xl flex justify-center items-center border-b border-[#454545] font-semibold">
                        {
                            mediaSelected ?
                                <>
                                    <div className="flex justify-between w-full px-5 pr-3 text-base items-center">
                                        <button className=""
                                            onClick={
                                                (e) => {
                                                    if (uploadingTool) {
                                                        setUploadingTool(false);
                                                        setEditingTool(true);
                                                    } else if (editingTool) {
                                                        setEditingTool(false);
                                                        setUploadingTool(false);
                                                    }
                                                }
                                            }>
                                            <svg aria-label="Back" className="" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                <title>Back</title>
                                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line>
                                                <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                            </svg>
                                        </button>
                                        <div className="">
                                            {
                                                uploadingTool ? "Upload" : "Edit"
                                            }
                                        </div>
                                        <button className="text-[#0095f6] px-2 py-1" onClick={
                                            () => {
                                                if (editingTool) {
                                                    setEditingTool(false);
                                                    setUploadingTool(true);
                                                } else {
                                                    setEditingTool(true);
                                                    setUploadingTool(false);
                                                }
                                            }
                                        }>{
                                                uploadingTool ? " " :
                                                    "Next"
                                            }</button>
                                    </div>
                                </> : "Create New Post"
                        }
                    </div>
                    {
                        !mediaSelected &&
                        <div className={`h-full w-full flex justify-center items-center ${draggingStart ? "bg-[#212121]" : ""}`}>
                            <div className="flex flex-col gap-5 items-center">
                                <div className="">
                                    <svg
                                        aria-label="Icon to represent media such as images or videos"
                                        className="x1lliihq x1n2onr6 x5n08af"
                                        fill="currentColor"
                                        height="77"
                                        role="img"
                                        viewBox="0 0 97.6 77.3"
                                        width="96">
                                        <title>Icon to represent media such as images or videos</title>
                                        <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                        <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                        <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div className="text-xl">Drag photos and videos here</div>
                                <button className="bg-[#0095f6] px-3 py-2 rounded-md"
                                    onClick={
                                        (e) => {
                                            const current = inputRef.current as HTMLInputElement | null;
                                            current?.click();
                                        }
                                    }>Select From Computer</button>
                            </div>

                        </div>
                    }
                    {
                        !uploadingTool && !editingTool && mediaSelected && files && propertList.length > 0
                        && <>
                            <div className={`h-[72dvh] w-full relative`}>
                                <div className="h-[72dvh] w-[580px] overflow-hidden rounded-b-xl">
                                    {
                                        propertList[currentIdx].type === "IMAGE" &&
                                        <FrontImageDisplayer currentIdx={currentIdx} propertList={propertList} imageSrc={canvasImageSrc} />
                                    }
                                    {
                                        propertList[currentIdx].type === "VIDEO" &&
                                        <VideoView currentIdx={currentIdx} files={files} />
                                    }
                                </div>
                                <div className="absolute bottom-0 w-full flex justify-between items-center p-3">
                                    <div className="flex items-center gap-5">
                                        <button className="bg-[#121212aa] p-3 rounded-full">
                                            <svg
                                                aria-label="Select crop"
                                                className="x1lliihq x1n2onr6 x9bdzbf"
                                                fill="currentColor"
                                                height="16"
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width="16"
                                            >
                                                <title>Select crop</title>
                                                <path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z">
                                                </path>
                                            </svg>
                                        </button>
                                        <div className="relative">
                                            <button className="bg-[#121212aa] p-3 rounded-full" onClick={(e) => {
                                                setZoomVisible(true);
                                                e.stopPropagation();
                                            }}>
                                                <svg
                                                    aria-label="Select zoom"
                                                    className="x1lliihq x1n2onr6 x9bdzbf"
                                                    fill="currentColor"
                                                    height="16"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    width="16"
                                                >
                                                    <title>Select zoom</title>
                                                    <path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z">
                                                    </path>
                                                </svg>
                                            </button>
                                            {
                                                zoomVisible &&
                                                <div className={`absolute -top-10 left-0`}>
                                                    <ZoomInputComponent
                                                        setZoomVisible={setZoomVisible}
                                                        zoomValue={zoomValue}
                                                        currentIdx={currentIdx}
                                                        setPropertList={setPropertList}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button className="bg-[#121212aa] p-3 rounded-full relative" onClick={
                                            () => {
                                                setOpenImageAddON(true);
                                            }
                                        }>
                                            <svg
                                                aria-label="Open media gallery"
                                                className=""
                                                fill="currentColor"
                                                height="16"
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width="16"
                                            >
                                                <title>Open media gallery</title>
                                                <path d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z" fillRule="evenodd">
                                                </path>
                                            </svg>
                                        </button>
                                        {
                                            openImageAddON &&
                                            <div className='absolute bottom-10 right-0 z-10'>
                                                <ImageAddOn setOpenImageAddON={setOpenImageAddON} files={files} setCurrentIdx={setCurrentIdx} propertyList={propertList} setFiles={setFiles} openMediaInputBox={openMediaInputBox} />
                                            </div>
                                        }
                                    </div>
                                </div>


                                <div className="flex gap-2 absolute bottom-6 left-1/2 -translate-x-1/2">
                                    {
                                        files.map((opt, index) => {
                                            return (
                                                <div className={`w-[7px] h-[7px] rounded-full ${index === currentIdx ? "bg-[#0095f6]" : "bg-[#dedede77]"}`} key={index}>
                                                </div>
                                            );
                                        })
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
                    }
                    {
                        editingTool
                        && (
                            <>
                                <div className="w-[90dvw] max-w-[950px] h-[72dvh] flex rounded-b-xl">

                                    {
                                        propertList[currentIdx].type === "IMAGE" &&
                                        <>
                                            <ImageCanvas
                                                imageSrc={canvasImageSrc}
                                                currentIdx={currentIdx}
                                                propertList={propertList}
                                                files={files}
                                                setCurrentIdx={setCurrentIdx} />

                                            <ImageEditorTools
                                                currentIdx={currentIdx}
                                                propertList={propertList}
                                                setPropertList={setPropertList}
                                            />
                                        </>
                                    }
                                    {
                                        propertList[currentIdx].type === "VIDEO" &&
                                        <>
                                            <VideoCanvasEditing
                                                currentIdx={currentIdx}
                                                files={files}
                                                setCurrentIdx={setCurrentIdx}
                                                propertList={propertList}
                                                setPropertList={setPropertList}
                                            />
                                        </>
                                    }

                                </div>
                            </>
                        )
                    }
                    {
                        uploadingTool && (
                            <>
                                <div className="w-[90dvw] max-w-[950px] h-[72dvh] flex rounded-b-xl">
                                    {
                                        propertList[currentIdx].type === "IMAGE" &&
                                        <ImageCanvasUploader currentIdx={currentIdx} files={files} setCurrentIdx={setCurrentIdx} imageSrc={canvasImageSrc} propertList={propertList} />
                                    }
                                    {
                                        propertList[currentIdx].type === "VIDEO" &&
                                        <VideoCanvasUploader currentIdx={currentIdx} files={files} propertList={propertList} setCurrentIdx={setCurrentIdx} />
                                    }

                                    <PostUploaderTools files={files} propertyList={propertList} setIsUploadingStart={setIsUploadingStart}
                                        setUploadBoxEnabled={setUploadBoxEnabled}
                                    />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <button className="absolute top-5 right-5 z-10 text-2xl px-5 py-3 shadow shadow-[#343434] hover:border-[#454545] rounded-md border border-transparent" onClick={() => { setUploadBoxEnabled(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#dedede" width="40px" height="40px" viewBox="0 0 32 32">
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
            </button>

            {
                isUploadingStart
                &&
                <div className="absolute top-0 left-0 z-20 flex justify-center items-center bg-[#28282811] w-[100dvw] h-[100dvh]">
                    <Image src={"/gif/Spinner.gif"} alt='spinner' width={100} height={100} className='w-[100px] h-[100px] mix-blend-multiply bg-[#282828]' unoptimized={true} />
                </div>
            }
        </>
    )
}

export default ImageUploader
