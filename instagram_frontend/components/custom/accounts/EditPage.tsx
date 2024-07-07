"use client";
import React, { useEffect, useState } from 'react'
import ProfileImageChange from '@/components/custom/accounts/ProfileImageChange';
import Footer from "@/components/custom/common/Footer";
import { useUserState } from '@/context/userContext';
import axios from "axios";

const EditPage = () => {
    const userStates = useUserState();
    const user = userStates ? userStates.user : null;
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        };
        if (user?.bio) {
            setBio(user.bio);
        }
    }, [user.name, user.bio]);

    const handleDataUpdate = async () => {
        try {
            const dataUpdateReponse = await axios.put("http://localhost:4000/api/user/data", {
                userId: user.id,
                bio: bio,
                name: name
            });
            if (dataUpdateReponse.status === 200) {
                console.log(dataUpdateReponse.data.message);
            }
        } catch (e: any) {
            console.log(e.message);
        }
    }

    return (
        <>
            {
                user &&
                <div className="overflow-y-scroll h-[100dvh]">
                    <div className="px-40 py-5 ">
                        <div className="py-5 text-xl font-semibold">Edit Profile</div>
                        <ProfileImageChange />
                        <div className="py-4">
                            <div className="text-lg font-semibold pb-3">Name</div>
                            <div className="">
                                <input value={name} className='p-3 rounded-xl outline-none border border-[#454545] w-full bg-[#282828]' onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="text-xs text-[#676767] pt-2">
                                It is not your user name.
                            </div>
                        </div>

                        <div className="py-4">
                            <div className="text-lg font-semibold pb-3">Bio</div>
                            <div className="">
                                <textarea value={bio} className='p-3 rounded-xl outline-none border border-[#454545] w-full' rows={2} onChange={(e) => { setBio(e.target.value) }} />
                            </div>
                        </div>

                        <div className="flex justify-end py-4">
                            <button className="bg-[#0095f6] text-[#dedede] px-3 py-2 rounded-xl" onClick={handleDataUpdate}>Submit Change</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}

export default EditPage
