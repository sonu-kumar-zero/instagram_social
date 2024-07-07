"use client";
import { useUserState } from '@/context/userContext';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import axios from 'axios';

const ProfileImageChange = () => {

    const userStates = useUserState();
    const user = userStates ? userStates.user : null;

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        const current = fileInputRef?.current as HTMLInputElement | null;
        current?.click();
    };

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleDialogClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        if (target.classList.contains("dialog_body"))
            setDialogOpen(false);
    };

    const imageUploadToCDN = async (fileId: string) => {
        try {
            const current = fileInputRef?.current as HTMLInputElement | null;
            if (!current) return;
            const file = current.files ? current.files[0] : null;
            if (!file) return;
            console.log(file);
            const form = new FormData();
            form.append("file", file);
            form.append("fileId", fileId);
            const imageUploadResponse = await axios.post(`http://127.0.0.1:8000/api/upload/profile`, form);
            console.log(imageUploadResponse.data);
        } catch (error: any) {
            console.log("Error Uploading To Image", error.message)
        }
    }

    const handleImageUpload = async () => {
        try {
            const current = fileInputRef?.current as HTMLInputElement | null;
            if (!current) return;
            const file = current.files ? current.files[0] : null;
            if (!file) return;
            console.log(file);

            if (!user.imageUrl) {
                const imageIdGeneration = await axios.post(`http://127.0.0.1:4000/api/upload/profile`, {
                    userId: user.id
                });
                imageUploadToCDN(imageIdGeneration.data.imageUrl);
            } else {
                imageUploadToCDN(user.imageUrl);
            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            {user &&
                <div className="my-5 p-3 bg-[#282828] flex justify-between items-center rounded-xl">
                    <div className="flex gap-3 items-center">
                        <div className="">
                            <Image src={user.imageUrl ? `http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg` : "/images/sonu_profile.jpeg"} width={60} height={60} alt='profile_img' className='w-[60px] h-[60px] object-cover rounded-full' />
                        </div>
                        <div className="">
                            <div className="font-semibold">{user.userName}</div>
                            <div className="text-xs text-[#787878]">{user.name}</div>
                        </div>
                    </div>
                    <button className="bg-[#0095f6] text-[#dedede] px-3 py-2 rounded-xl"
                        onClick={
                            () => {
                                setDialogOpen(true);
                            }
                        }
                    >Change photo</button>
                </div>
            }
            {
                dialogOpen &&
                (
                    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] bg-[#00000088] flex justify-center items-center dialog_body" onClick={handleDialogClose}>
                        <div className="w-[400px] bg-[#232323] rounded-xl flex flex-col">
                            <div className="text-xl py-5 text-center cursor-default">Change Profile Photo</div>
                            <label htmlFor="imageInput">
                                <input type="file" accept="image/*" className="hidden" id="imageInput" ref={fileInputRef} onChange={handleImageUpload} />
                                <button type="button" className="text-center py-3 hover:bg-[#323232] text-[#0095fe] w-full" onClick={handleButtonClick}>Upload Photo</button>
                            </label>
                            <button className="text-center  text-[#d13434] py-3 hover:bg-[#323232]">Remove Current Photo</button>
                            <button className="text-center  py-3 hover:bg-[#323232] rounded-b-xl" onClick={() => { setDialogOpen(false); }}>Cancel</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProfileImageChange
