// "use client";
// import Image from 'next/image'
// import Link from 'next/link';
// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { FiSettings } from "react-icons/fi";
// import { IoAddOutline } from "react-icons/io5";
// import { MdGridOn } from "react-icons/md";
// import { FaRegBookmark } from "react-icons/fa";
// import { BsPersonSquare } from "react-icons/bs";
// import { useUserState } from '@/context/userContext';
// import axios from "axios";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";

// interface ProfilePageProps {
//     userName: string;
// }

// const ProfilePage: React.FC<ProfilePageProps> = ({ userName }) => {
//     const userStates = useUserState();
//     const [followAccepted, setFollowAccepted] = useState<boolean>(false);
//     const [isFollowRequestSended, setIsFollowRequestSended] = useState<boolean>(false);
//     // const realUser = userStates?.user;
//     const realUser = useMemo(() => userStates?.user || {}, [userStates?.user]);

//     const [user, setUser] = useState({
//         imageUrl: null,
//         userName: null,
//         postsCount: 0,
//         followerCount: 0,
//         followingCount: 0,
//         name: null,
//         bio: null,
//         id: null
//     });

//     const fetchDataOfCurrentUser = useCallback(async () => {
//         if (!userName) return;
//         try {
//             const response = await axios.get(`http://localhost:4000/api/user/data/${userName}`);
//             if (response.status === 200) {
//                 const fetchedUser = response.data.user;
//                 setUser(fetchedUser);
//                 userStates?.setCurrentUser(fetchedUser);
//             }
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     }, [userName]);

//     useEffect(() => {
//         if (realUser?.userName === userName) {
//             userStates?.setCurrentUser(realUser);
//             setUser(realUser);
//         } else {
//             fetchDataOfCurrentUser();
//         }
//     }, [fetchDataOfCurrentUser, realUser, userName, userStates]);

//     const handleFriendRequestSend = async () => {
//         try {
//             if (!realUser.id || !user.id) return;

//             const response = await axios.post(`http://localhost:4000/api/user/follow/${realUser.id}/${user.id}`);
//             console.log(response);
//         } catch (error: any) {
//             console.error("Error sending friend request:", error.message);
//         }
//     };

//     const checkIsFollowAccepted = useCallback(async () => {
//         try {
//             if (!user.id || !realUser.id) return;

//             const response = await axios.get(
//                 `http://localhost:4000/api/user/follow/status/${realUser.id}/${user.id}`
//             );
//             if (response.status === 200) {
//                 setIsFollowRequestSended(true);
//                 setFollowAccepted(response.data.status.isAccepted);
//             }
//         } catch (error: any) {
//             console.error("Error checking follow status:", error.message);
//         }
//     }, [user, realUser]);

//     useEffect(() => {
//         if (userName && userName === realUser?.userName) return;
//         checkIsFollowAccepted();
//     }, [userName, realUser, checkIsFollowAccepted]);

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="px-40">
//             <div className="px-10 py-10">
//                 <div className="px-10 flex gap-20 items-center">
//                     <div>
//                         <Image
//                             src={user.imageUrl ? `http://127.0.0.1:8000/uploads/profile/${user.imageUrl}/300_300.jpg` : "/images/sonu_profile.jpg"}
//                             width={200}
//                             height={200}
//                             alt='profile_img'
//                             className='w-[200px] h-[200px] rounded-full object-cover'
//                         />
//                     </div>
//                     <div className="flex flex-col gap-5">
//                         <div className="flex gap-5 items-center">
//                             <div>{user.userName}</div>
//                             <div className="flex gap-2 text-sm">
//                                 {realUser?.userName === userName ? (
//                                     <>
//                                         <Link href={"/accounts"} className="bg-[#56565666] px-4 py-1 rounded-md">Edit profile</Link>
//                                         <button className="bg-[#56565666] px-4 py-1 rounded-md">View archive</button>
//                                         <button>
//                                             <FiSettings size={28} />
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         {isFollowRequestSended && (
//                                             followAccepted ? (
//                                                 <div className="text-[#dedede] bg-[#56565666] px-4 py-1 rounded-md">Following</div>
//                                             ) : (
//                                                 <div className="text-[#dedede] bg-[#56565666] px-4 py-1 rounded-md">Requested</div>
//                                             )
//                                         )}
//                                         {!isFollowRequestSended && (
//                                             <button className="text-[#dedede] bg-[#0095f6] px-4 py-1 rounded-md" onClick={handleFriendRequestSend}>Follow</button>
//                                         )}
//                                         <button>
//                                             <HiOutlineDotsHorizontal size={28} />
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="text-sm flex gap-10">
//                             <div className="flex gap-1">
//                                 <span className='font-semibold'>{user.postsCount}</span>
//                                 <span>post</span>
//                             </div>
//                             {userName === realUser?.userName ? (
//                                 <>
//                                     <Link href={`/${user.userName}/followers`} className="flex gap-1 cursor-pointer">
//                                         <span className='font-semibold'>{user.followerCount}</span>
//                                         <span>followers</span>
//                                     </Link>
//                                     <Link href={`/${user.userName}/following`} className="flex gap-1 cursor-pointer">
//                                         <span className='font-semibold'>{user.followingCount}</span>
//                                         <span>following</span>
//                                     </Link>
//                                 </>
//                             ) : (
//                                 followAccepted ? (
//                                     <>
//                                         <Link href={`/${user.userName}/followers`} className="flex gap-1 cursor-pointer">
//                                             <span className='font-semibold'>{user.followerCount}</span>
//                                             <span>followers</span>
//                                         </Link>
//                                         <Link href={`/${user.userName}/following`} className="flex gap-1 cursor-pointer">
//                                             <span className='font-semibold'>{user.followingCount}</span>
//                                             <span>following</span>
//                                         </Link>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <div className="flex gap-1 cursor-pointer">
//                                             <span className='font-semibold'>{user.followerCount}</span>
//                                             <span>followers</span>
//                                         </div>
//                                         <div className="flex gap-1 cursor-pointer">
//                                             <span className='font-semibold'>{user.followingCount}</span>
//                                             <span>following</span>
//                                         </div>
//                                     </>
//                                 )
//                             )}
//                         </div>
//                         <div>
//                             <div className="text-xs font-semibold">{user.name ? user.name : user.userName}</div>
//                             <pre className="text-sm break-all">{user.bio}</pre>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex px-5 gap-10 pt-5 pb-10 border-b border-[#dedede44]">
//                 <div className="flex flex-col gap-4 items-center">
//                     <div className="rounded-full p-1 bg-[#343434]">
//                         <div className="bg-[#343434] rounded-full p-5 border-2 border-[#000]">
//                             <IoAddOutline size={40} />
//                         </div>
//                     </div>
//                     <div className="font-semibold text-sm">New</div>
//                 </div>
//             </div>

//             <div className="flex justify-center gap-16 py-5">
//                 <Link href={`/${user.userName}`} className='flex gap-3 items-center'>
//                     <MdGridOn />
//                     <span className='font-semibold'>POSTS</span>
//                 </Link>
//                 {realUser?.userName === userName && (
//                     <Link href={`/${user.userName}/saved`} className='flex gap-3 items-center'>
//                         <FaRegBookmark />
//                         <span className='font-semibold'>SAVED</span>
//                     </Link>
//                 )}
//                 <Link href={`/${user.userName}/tagged`} className='flex gap-3 items-center'>
//                     <BsPersonSquare />
//                     <span className='font-semibold'>TAGGED</span>
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default ProfilePage;













"use client";
import Image from 'next/image'
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiSettings } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { MdGridOn } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { useUserState } from '@/context/userContext';
import axios from "axios";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface ProfilePageProps {
    userName: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userName }) => {
    const userStates = useUserState();
    const [followAccepted, setFollowAccepted] = useState<boolean>(false);
    const [isFollowRequestSended, setIsFollowRequestSended] = useState<boolean>(false);
    // const realUser = userStates?.user;
    const realUser = useMemo(() => userStates?.user || {}, [userStates?.user]);


    const [user, setUser] = useState({
        imageUrl: null,
        userName: null,
        postsCount: 0,
        followerCount: 0,
        followingCount: 0,
        name: null,
        bio: null,
        id: null
    });

    const fetchdataOfCurrentUser = useCallback(async () => {
        if (!userName)
            return;
        const searchUserFromUserName = await axios.get(
            `http://localhost:4000/api/user/data/${userName}`
        );
        if (searchUserFromUserName.status === 200) {
            setUser((prev) => searchUserFromUserName.data.user);
            userStates?.setCurrentUser(searchUserFromUserName.data.user);
        };
    }, [userName]);

    useEffect(() => {
        if (userStates?.user?.userName === userName) {
            userStates?.setCurrentUser(userStates?.user);
            setUser(userStates?.user);
        } else {
            fetchdataOfCurrentUser();
        }
    }, [fetchdataOfCurrentUser, userStates?.user, userName]);

    const handleFriendRequestSend = async () => {
        try {
            if (!realUser.id || !user.id)
                return;
            const friendRequestSendResponse = await axios.post(`http://localhost:4000/api/user/follow/${realUser.id}/${user.id}`);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const checkIsFollowAccepted = useCallback(async () => {
        try {
            if (!user || !user.id)
                return;
            if (!realUser || !realUser.id)
                return;
            const checkIsFollowAcceptedResponse = await axios.get(
                `http://localhost:4000/api/user/follow/status/${realUser.id}/${user.id}`
            );
            if (checkIsFollowAcceptedResponse.status === 200) {
                setIsFollowRequestSended(true);
                setFollowAccepted(checkIsFollowAcceptedResponse.data.status.isAccepted);
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }, [user, realUser]);


    useEffect(() => {
        if (userName && userName === realUser.userName)
            return;
        checkIsFollowAccepted();

    }, [userName, realUser, checkIsFollowAccepted]);

    if (!user) {
        return <div>Loading...</div>;
    };

    return (
        <>
            {user &&
                <div className="px-40">
                    <div className="px-10 py-10  ">
                        <div className="px-10 flex gap-20 items-center">
                            <div className="">
                                <Image src={user.imageUrl ? `http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/300_300.jpg` : "/images/sonu_profile.jpg"} width={200} height={200} alt='profile_img' className='w-[200px] h-[200px] rounded-full object-cover' />
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-5 items-center">
                                    <div className="">{user.userName}</div>
                                    <div className="flex gap-2 text-sm">
                                        {
                                            (realUser && userName === realUser?.userName) ?
                                                <>
                                                    <Link href={"/accounts"} className="bg-[#56565666] px-4 py-1 rounded-md">Edit profile</Link>
                                                    <button className="bg-[#56565666] px-4 py-1 rounded-md">View archive</button>
                                                    <button className="">
                                                        <FiSettings size={28} />
                                                    </button>
                                                </> :
                                                <>
                                                    {
                                                        isFollowRequestSended &&
                                                        (
                                                            followAccepted ?
                                                                <div className="text-[#dedede] bg-[#56565666] px-4 py-1 rounded-md" >Following</div>
                                                                :
                                                                <div className="text-[#dedede] bg-[#56565666] px-4 py-1 rounded-md" >Requested</div>
                                                        )
                                                    }
                                                    {
                                                        !isFollowRequestSended &&
                                                        <button className="text-[#dedede] bg-[#0095f6] px-4 py-1 rounded-md" onClick={handleFriendRequestSend}>Follow</button>
                                                    }
                                                    <button className="">
                                                        <HiOutlineDotsHorizontal size={28} />
                                                    </button>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className="text-sm flex gap-10">
                                    <div className="flex gap-1">
                                        <span className='font-semibold'>{user.postsCount}</span>
                                        <span>post</span>
                                    </div>
                                    {
                                        userName === realUser?.userName
                                            ?
                                            <>
                                                <Link href={`/${user.userName}/followers`} className="flex gap-1 cursor-pointer">
                                                    <span className='font-semibold'>{user.followerCount}</span>
                                                    <span>followers</span>
                                                </Link>
                                                <Link href={`/${user.userName}/following`} className="flex gap-1 cursor-pointer">
                                                    <span className='font-semibold'>{user.followingCount}</span>
                                                    <span>following</span>
                                                </Link>
                                            </>
                                            :
                                            (
                                                followAccepted ?
                                                    <>
                                                        <Link href={`/${user.userName}/followers`} className="flex gap-1 cursor-pointer">
                                                            <span className='font-semibold'>{user.followerCount}</span>
                                                            <span>followers</span>
                                                        </Link>
                                                        <Link href={`/${user.userName}/following`} className="flex gap-1 cursor-pointer">
                                                            <span className='font-semibold'>{user.followingCount}</span>
                                                            <span>following</span>
                                                        </Link>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex gap-1 cursor-pointer">
                                                            <span className='font-semibold'>{user.followerCount}</span>
                                                            <span>followers</span>
                                                        </div>
                                                        <div className="flex gap-1 cursor-pointer">
                                                            <span className='font-semibold'>{user.followingCount}</span>
                                                            <span>following</span>
                                                        </div>
                                                    </>
                                            )
                                    }
                                </div>
                                <div className="">
                                    <div className="text-xs font-semibold">{user.name ? user.name : user.userName}</div>
                                    <pre className="text-sm break-all">{user.bio}</pre>
                                </div>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>

                    <div className="flex px-5 gap-10 pt-5 pb-10 border-b border-[#dedede44]">
                        {/* <div className="flex flex-col gap-4 items-center">
                            <div className="rounded-full p-1 bg-[#343434]">
                                <div className="bg-[#343434] rounded-full p-5 border-2 border-[#000]">
                                    <IoAddOutline size={40} />
                                </div>
                            </div>
                            <div className="font-semibold text-sm">New</div>
                        </div> */}

                    </div>

                    <div className="flex justify-center gap-16 py-5">
                        <Link href={`/${user.userName}`} className='flex gap-3 items-center'>
                            <MdGridOn />
                            <span className='font-semibold'>POSTS</span>
                        </Link>
                        {
                            realUser.userName === userName &&
                            <Link href={`/${user.userName}/saved`} className='flex gap-3 items-center'>
                                <FaRegBookmark />
                                <span className='font-semibold'>SAVED</span>
                            </Link>
                        }
                        <Link href={`/${user.userName}/tagged`} className='flex gap-3 items-center'>
                            <BsPersonSquare />
                            <span className='font-semibold'>TAGGED</span>
                        </Link>
                    </div>
                </div >
            }
        </>
    )
}

export default ProfilePage
