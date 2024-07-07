"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserState } from '@/context/userContext';
import { UserType } from '@/types/modelsTypes';

interface LoginBoxProps {
}

const LoginBox: React.FC<LoginBoxProps> = () => {

    const router = useRouter();
    const userStates = useUserState();

    const [formData, setFormData] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: ""
    });

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData((prev) => (
            { ...prev, [target.name]: target.value }
        ))
    };
    const loginHandler = async () => {
        try {
            if (!userStates)
                return;
            console.log(formData);
            const loginRespose = await axios.post(`http://127.0.0.1:4000/api/user/login`, {
                ...formData
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(loginRespose);
            if (loginRespose.status === 200) {
                const user: UserType = loginRespose.data.user;
                const token = loginRespose.data.token;
                userStates.setUser(
                    {
                        userName: user.userName,
                        id: user.id,
                        bio: user.bio,
                        email: user.email,
                        followerCount: user.followerCount,
                        followingCount: user.followingCount,
                        imageUrl: user.imageUrl,
                        name: user.name,
                        postsCount: user.postsCount,
                        profileType: user.profileType,
                        userDefaultSavedId: user.userDefaultSavedId
                    }
                );
                userStates.setLoginUser(
                    {
                        userName: user.userName,
                        id: user.id,
                        bio: user.bio,
                        email: user.email,
                        followerCount: user.followerCount,
                        followingCount: user.followingCount,
                        imageUrl: user.imageUrl,
                        name: user.name,
                        postsCount: user.postsCount,
                    }
                )
                userStates.setToken(token);
                router.push("/");
            }
        } catch (error: any) {
            console.log(error?.message);
        }
    }

    return (
        <>
            <form className='flex flex-col gap-1'>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='email' className='text-xs text-[#dedede66]'>UserName, or email</label>
                    <input type='text' placeholder='' id='email' name='email' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.email} onChange={onInputValueChange} />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='password' className='text-xs text-[#dedede66]'>Password</label>
                    <input placeholder='' type='password' id='password' name='password' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.password} onChange={onInputValueChange} />
                </div>
                <div className="py-2">
                    <button className='w-full text-[#dedede] bg-[#0095f6] rounded py-2' onClick={
                        (e) => {
                            e.preventDefault();
                            loginHandler();
                        }
                    }>Log in</button>
                </div>
            </form>
        </>
    )
}

export default LoginBox
