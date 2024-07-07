"use client";
import React, { useState } from 'react';
import SearchUserBar from '@/components/custom/search/SearchUserBar';
import axios from 'axios';
// import { searchUserByUser } from '@/constants/queries';

interface searchUserType {
    bio: string | null,
    followerCount: number,
    followingCount: number,
    id: string,
    imageUrl: string | null,
    postsCount: number,
    profileType: string,
    userName: string,
    name: string | null
}

const SearchView = () => {

    // axios.post(
    //     "http://127.0.0.1:5000/graphql",
    //     {
    //         query: searchUserByUser,
    //         variables: {
    //             userName: searchVal
    //         }
    //     }
    // );

    const [searchVal, setSearchVal] = useState<string>("");
    const [users, setUsers] = useState<searchUserType[]>([]);

    const handleSearch = async () => {
        try {
            const searchResponse = await axios.get(
                `http://localhost:4000/api/user/search/${searchVal}`
            );
            if (searchResponse.status === 200) {
                setUsers((prev) => searchResponse.data.users);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div
                className={`w-[30dvw] h-[100dvh] bg-[#101010] simple_navbar rounded-r-xl flex flex-col`}>
                <div className="border-b border-[#dedede77] px-4 py-6 flex flex-col gap-8">
                    <div className="text-xl font-semibold">Search</div>
                    <div className="flex w-full rounded-lg  bg-[#232323] p-3">
                        <input placeholder='Seach...' className='outline-none border-none w-full bg-[#232323]' value={searchVal} onChange={(e) => { setSearchVal(e.target.value) }} />
                        <button className='text-[#0095f6]' onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="pb-4 h-[80dvh] flex w-full">
                    <div className="h-full w-full flex flex-col overflow-y-scroll">
                        <div className="flex justify-between px-5 py-5">
                            <div className="font-semibold">Recent</div>
                            <button className="text-[#0095f6]">Clear all</button>
                        </div>
                        {
                            users.length > 0 && users.map((us) => {
                                return <SearchUserBar key={us.id} id={us.id} imageUrl={us.imageUrl} userName={us.userName} name={us.name} />
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchView
