"use client";
import { useUserState } from '@/context/userContext';
import React, { useCallback, useEffect, useState } from 'react'
import Footer from '@/components/custom/common/Footer';
import axios from 'axios';

const PrivacySettingsPage = () => {
    const userStates = useUserState();
    const [userProfileChoise, setUserProfileChoise] = useState<boolean>(true);
    // 1 => private
    // 0 => public
    // PRIVATE
    // PUBLIC
    const user = userStates ? userStates.user : null;

    useEffect(() => {
        if (user) {
            setUserProfileChoise((prev) => {
                const val = user.profileType === "PUBLIC" ? false : true;
                return val;
            });
        }
    }, [user, user?.profileType]);

    const updateProfileTypeApi = useCallback(async () => {
        try {
            if (!user)
                return;
            const nowProfileType = userProfileChoise === false ? "PUBLIC" : "PRIVATE";
            const updateProfileTypeApiResponse = await axios.put(
                `http://127.0.0.1:4000/api/user/user/profileType`,
                {
                    userId: user.id,
                    nowProfileType: nowProfileType
                }
            );
            if (updateProfileTypeApiResponse.status === 200) {
                console.log(updateProfileTypeApiResponse.data.message);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }, [user, userProfileChoise]);


    return (
        <>
            {
                user &&
                (
                    <>
                        <div className="h-[100dvh] flex flex-col justify-between">
                            <div className="px-40 py-5">
                                <div className="py-5 text-xl font-semibold">Account Privacy</div>
                                <div className="py-4 flex justify-between">
                                    <div className="">Private Account</div>
                                    <div className="">
                                        <label className="switch">
                                            <input type="checkbox" checked={userProfileChoise} onChange={(e) => {
                                                setUserProfileChoise(e.target.checked);
                                            }} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <span className="text-sm text-[#676767]">
                                        When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don`t have an Instagram account.
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <span className="text-sm text-[#676767]">
                                        When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists.
                                        <a href="#" className='text-[#0095f6] pl-1'>Learn More...</a>
                                    </span>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="bg-[#0095f6] text-[#dedede] px-3 py-2 rounded-xl" onClick={
                                        () => {
                                            updateProfileTypeApi()
                                        }
                                    }>Update</button>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PrivacySettingsPage
