"use client";
import React, { useEffect, useRef, useState } from 'react';
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiAddToQueue } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { useUserState } from '@/context/userContext';
import SearchView from '@/components/custom/search/SearchView';
import ImageUploader from '@/components/custom/mediaupload/ImageUploader';
import { usePathname } from 'next/navigation';


const iconMap: Record<string, React.ReactNode> = {
    home: <GoHome />,
    search: <IoSearch />,
    explore: <FaRegCompass />,
    reels: <SiYoutubeshorts />,
    direct: <RiMessengerLine />,
    notifications: <FaRegHeart />,
    // create: <BiAddToQueue />,
    // profile: (<Image src={"/images/sonu_profile.jpeg"} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />),
}

const mainOptions:
    {
        "id": Number,
        "icon": string,
        "title": string
    }[] = [
        {
            "id": 1,
            "icon": "home",
            "title": "Home"
        },
        {
            "id": 2,
            "icon": "search",
            "title": "Search"
        },
        {
            "id": 3,
            "icon": "explore",
            "title": "Explore"
        },
        {
            "id": 4,
            "icon": "reels",
            "title": "Reels"
        },
        {
            "id": 5,
            "icon": "direct",
            "title": "Messages"
        },
        {
            "id": 6,
            "icon": "notifications",
            "title": "Notifications"
        },
        // {
        //     "id": 7,
        //     "icon": "create",
        //     "title": "Create"
        // },
        // {
        //     "id": 8,
        //     "icon": "profile",
        //     "title": "Profile"
        // },
    ]


interface NavbBarProps {
    setSearchBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    serachBoxEnabled: boolean;
    setUploadBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    uploadBoxEnabled: boolean;
    simpleNavbarOn: boolean;
    setSimpleNavbarOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NormalNavbar: React.FC<NavbBarProps> = ({ setSearchBoxEnabled, setUploadBoxEnabled, setSimpleNavbarOn }) => {
    const userState = useUserState();
    const user = userState ? userState.user : null;
    const normalNavbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: any) => {
            if (!normalNavbarRef.current?.contains(e.target)) {
                setSearchBoxEnabled(false);
                setSimpleNavbarOn(false);
            }
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [setSearchBoxEnabled, setSimpleNavbarOn]);

    return (
        <div ref={normalNavbarRef} className='navbar_box p-5 px-3 min-w-[250px] w-[250px] flex flex-col bg-[#101010] border-r border-[#ddd] border-opacity-20 justify-between h-full'>
            <div className="flex flex-col">
                <div className="h-[50px] w-fit">
                    <Link href={"/"} className="text-2xl px-2 py-5 cursor-pointer" onClick={() => {
                        setSimpleNavbarOn(false);
                    }}>
                        Instagram
                    </Link>
                </div>
                <div className="flex flex-col gap-2 py-3">
                    {
                        mainOptions.map((opt, index) => {
                            return (
                                <Link href={`${opt.icon !== "search" ? opt.icon !== "home" ? "/" + opt.icon : "/" : "#"}`} key={index} className='flex gap-3 py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00]' onClick={
                                    (e) => {
                                        if (opt.icon === "search") {
                                            setSearchBoxEnabled(true);
                                            setSimpleNavbarOn(true);
                                        };
                                        if (opt.icon === "home") {
                                            setSimpleNavbarOn(false);
                                        }
                                    }
                                } >
                                    <div className="text-[28px] px-[2px] w-[34px]" >
                                        {
                                            iconMap[opt.icon]
                                        }
                                    </div>
                                    <div className="">
                                        {opt.title}
                                    </div>
                                </Link>
                            )
                        })
                    }
                    <button className="flex gap-3 py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00]" onClick={
                        () => {
                            setUploadBoxEnabled(true)
                        }
                    }>
                        <div className="text-[28px] px-[2px] w-[34px]">
                            <BiAddToQueue />
                        </div>
                        <div className="">Create</div>
                    </button>
                    <Link href={`/${user?.userName}`} className='flex gap-3 py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00]'  >
                        <div className="text-[28px] px-[2px] w-[34px]" >
                            {
                                user?.imageUrl !== null
                                    ?
                                    <Image src={`http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                    : <Image src={`/images/sonu_profile.jpeg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                            }
                        </div>
                        <div className="">
                            {user?.userName || ""}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="">
                <div className='hover:bg-[#232323] rounded-lg'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-full flex gap-3 border-none outline-none py-3 px-2   cursor-pointer'>
                            <div className="text-2xl px-[2px] w-[34px]">
                                <GiHamburgerMenu />
                            </div>
                            <div className="">
                                More
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='border-none w-[220px] p-3'>
                            <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]'>Settings</div>
                            <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]' >Log Out</div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}


const SimpleNavbar: React.FC<NavbBarProps> = ({ setSearchBoxEnabled, serachBoxEnabled, setUploadBoxEnabled, setSimpleNavbarOn }) => {
    const userState = useUserState();
    const user = userState ? userState.user : null;
    const simpleNavbarRef = useRef<HTMLDivElement>(null);
    const searchViewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: any) => {
            if (simpleNavbarRef.current?.contains(e.target) || !searchViewRef.current?.contains(e.target)) {
                setSearchBoxEnabled(false);
                setSimpleNavbarOn(false);
            };
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [setSearchBoxEnabled, setSimpleNavbarOn]);

    return (
        <>
            <div className="relative flex">
                <div ref={simpleNavbarRef} className="navbar_box min-w-[75px] w-[75px]">
                    <div className='p-5 px-3 min-w-fit w-fit flex flex-col bg-[#101010] border-r border-[#ddd] border-opacity-20 justify-between h-full'>
                        <div className="flex flex-col">
                            <div className="h-[50px] w-fit ">
                                <Link href={"/"} className="text-[28px] w-[50px] h-[50px] cursor-pointer flex items-center justify-center hover:bg-[#232323] rounded-lg">
                                    <Image src={"/images/sonu_profile.jpeg"} width={40} height={40} alt='logo' className='rounded-lg object-cover w-[40px] h-[40px]' />
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2 py-3">
                                {
                                    mainOptions.map((opt, index) => {
                                        return (
                                            <Link href={`${opt.icon !== "search" ? opt.icon !== "home" ? opt.icon === "profile" ? "/" + user?.userName : "/" + opt.icon : "/" : "#"}`} key={index} className='flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center' onClick={
                                                (e) => {
                                                    if (opt.icon === "search") {
                                                        setSearchBoxEnabled(false);
                                                        setSimpleNavbarOn(false);
                                                    }
                                                }
                                            }>
                                                <div className="text-[28px] " >
                                                    {
                                                        (opt.icon === "profile" && user?.imageUrl !== null)
                                                            ?
                                                            <Image src={`http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                                            : iconMap[opt.icon]}
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                                <div className="flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center text-[28px]">
                                    <BiAddToQueue />
                                </div>
                                <Link href={`/${user?.userName}`} className='flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center'>
                                    <div className="text-[28px]" >
                                        {
                                            user?.imageUrl !== null
                                                ?
                                                <Image src={`http://127.0.0.1:8000/uploads/profile/${user?.imageUrl}/100_100.jpg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                                : <Image src={`images/sonu_profile.jpeg`} width={30} height={30} alt='profile' className='rounded-full object-cover w-[30px] h-[30px]' />
                                        }
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <div className='flex py-3 px-2 items-center rounded-lg cursor-pointer hover:bg-[#232323] border border-[#dedede00] hover:border-[#dedede88] justify-center'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className=''>
                                        <div className="text-2xl w-full">
                                            <GiHamburgerMenu />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='border-none w-[220px] p-3'>
                                        <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]'>Settings</div>
                                        <div className='flex gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-[#343434]' >Log Out</div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    serachBoxEnabled &&
                    <div className='absolute top-0 left-[76px] z-10' ref={searchViewRef}>
                        <SearchView />
                    </div>
                }
                {
                    serachBoxEnabled &&
                    <div className="min-w-[175px] w-[175px] h-[100dvh]">&nbsp;</div>
                }
            </div>
        </>
    )
}

const Navbar = () => {

    const [serachBoxEnabled, setSearchBoxEnabled] = useState<boolean>(false);
    const [uploadBoxEnabled, setUploadBoxEnabled] = useState<boolean>(false);
    const [simpleNavbarOn, setSimpleNavbarOn] = useState<boolean>(false);

    const currentRoute = usePathname();
    if (currentRoute) {
        if (currentRoute.startsWith("/direct") && !simpleNavbarOn) {
            setSimpleNavbarOn(true);
        };
    }

    return (
        <>
            {
                simpleNavbarOn ?
                    <SimpleNavbar
                        simpleNavbarOn={simpleNavbarOn}
                        setSimpleNavbarOn={setSimpleNavbarOn}
                        setSearchBoxEnabled={setSearchBoxEnabled}
                        serachBoxEnabled={serachBoxEnabled}
                        uploadBoxEnabled={uploadBoxEnabled}
                        setUploadBoxEnabled={setUploadBoxEnabled} />
                    :
                    <NormalNavbar
                        simpleNavbarOn={simpleNavbarOn}
                        setSimpleNavbarOn={setSimpleNavbarOn}
                        setSearchBoxEnabled={setSearchBoxEnabled}
                        serachBoxEnabled={serachBoxEnabled}
                        uploadBoxEnabled={uploadBoxEnabled}
                        setUploadBoxEnabled={setUploadBoxEnabled}
                    />
            }
            {
                uploadBoxEnabled && <ImageUploader setUploadBoxEnabled={setUploadBoxEnabled} />
            }
        </>
    )
}

export default Navbar