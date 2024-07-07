"use client";
import { useUserState } from '@/context/userContext';
import { SavedPostsFamilyType, UserType } from '@/types/modelsTypes';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostsGridChild from '../explore/PostsGridChild';

interface SavedGalaryProps {
    posts: SavedPostsFamilyType;
    collectionName: string;
    setSavedGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavedGalary: React.FC<SavedGalaryProps> = ({ posts, collectionName, setSavedGalleryOpen }) => {
    return <>
        <div className='absolute z-[2] top-0 left-0 w-[100dvw] h-[100dvh]  px-40 bg-[#121212ee]'>
            <div className="py-5">
                <button className="flex gap-3 items-center" onClick={() => { setSavedGalleryOpen(false) }}>
                    <svg aria-label="Back" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Back</title><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                    <div className="text-[#898989] text-sm">Saved</div>
                </button>
            </div>
            <div className="flex justify-between items-center py-2">
                <span className='text-lg'>{collectionName}</span>
                <button className='py-2 pl-5'>
                    <svg aria-label="Edit options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Edit options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </button>
            </div>
            <div className="grid grid-cols-4 gap-1 pb-5 overflow-y-scroll h-[85dvh]">
                {
                    posts.posts.map((post) => {
                        return <PostsGridChild post={post.post} height='h-[300px]' key={post.id} />
                    })
                }
            </div>

        </div>
    </>
}


interface SavedCardProps {
    collection: SavedPostsFamilyType;
    collectionName: string;
}

const SavedCard: React.FC<SavedCardProps> = ({ collectionName, collection }) => {
    const [savedGalaryOpen, setSavedGalleryOpen] = useState<boolean>(false);
    return (
        <>
            <div className={`relative w-full h-[300px] border rounded-xl border-[#343434] grid ${collection.posts.length >= 2 ?
                (collection.posts.length >= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-2 grid-rows-1") : ""}`} onClick={() => { setSavedGalleryOpen(true) }}>
                {
                    collection.posts.map(
                        (col, index) => {
                            if (index >= 4)
                                return;
                            if (collection.posts.length === 3 && index > 1) return;
                            if (collection.posts.length === 1) {
                                if (col.post.postUrls[0].type === "IMAGE")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/posts/${col.post.postUrls[0].url}/1080_1080.jpg`} width={300} height={300} alt='saved_post' className={`w-full h-full object-cover rounded-xl`} />
                                else if (col.post.postUrls[0].type === "VIDEO")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/thumbnails/${col.post.postUrls[0].url}/1080_1920.jpg`} width={300} height={300} alt='saved_post' className='w-full h-[300px] object-cover rounded-xl' />
                            } else if (collection.posts.length >= 4) {
                                if (col.post.postUrls[0].type === "IMAGE")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/posts/${col.post.postUrls[0].url}/1080_1080.jpg`} width={300} height={300} alt='saved_post' className={`w-full h-full object-cover ${index === 0 ? "rounded-tl-xl" : ""} ${index === 1 ? "rounded-tr-xl" : ""} ${index === 2 ? "rounded-bl-xl" : ""} ${index === 3 ? "rounded-br-xl" : ""}`} />
                                else if (col.post.postUrls[0].type === "VIDEO")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/thumbnails/${col.post.postUrls[0].url}/1080_1920.jpg`} width={300} height={300} alt='saved_post' className={`w-full h-full object-cover ${index === 0 ? "rounded-tl-xl" : ""} ${index === 1 ? "rounded-tr-xl" : ""} ${index === 2 ? "rounded-bl-xl" : ""} ${index === 3 ? "rounded-br-xl" : ""}`} />
                            } else if (collection.posts.length >= 2) {
                                if (col.post.postUrls[0].type === "IMAGE")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/posts/${col.post.postUrls[0].url}/1080_1080.jpg`} width={300} height={300} alt='saved_post' className={`w-full h-full object-cover ${index === 0 ? "rounded-l-xl" : ""} ${index === 1 ? "rounded-r-xl" : ""} `} />
                                else if (col.post.postUrls[0].type === "VIDEO")
                                    return <Image key={col.id} src={`http://127.0.0.1:8000/uploads/thumbnails/${col.post.postUrls[0].url}/1080_1920.jpg`} width={300} height={300} alt='saved_post' className={`w-full h-full object-cover ${index === 0 ? "rounded-tl-xl" : ""} ${index === 1 ? "rounded-tr-xl" : ""} `} />
                            }
                        })
                }
                <div className="absolute top-0 left-0 w-full h-full flex flex-col p-5 justify-end bg-[#12121233] hover:bg-[#12121211] cursor-pointer">
                    <div className="h-fit w-full text-lg">
                        {collectionName}
                    </div>
                </div>
            </div>
            {
                savedGalaryOpen &&
                <SavedGalary posts={collection} collectionName={collectionName} setSavedGalleryOpen={setSavedGalleryOpen} />
            }
        </>
    )
}

interface NewCollectionCreationBoxProps {
    setNewCollectionCreationBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType | null;
}

const NewCollectionCreationBox: React.FC<NewCollectionCreationBoxProps> = ({ setNewCollectionCreationBoxOpen, user }) => {
    const creationBoxRef = useRef<HTMLDivElement>(null);
    const [collectionName, setCollectionName] = useState<string>("");

    const handleNewCollectionCreation = async () => {
        try {
            if (!user)
                return;
            const handleNewCollectionCreationResponse = await axios.post(
                `http://localhost:4000/api/upload/post/saved/post/container/${user.id}`,
                {
                    collectionName: collectionName
                }
            );
            if (handleNewCollectionCreationResponse.status === 200) {
                console.log(handleNewCollectionCreationResponse.data.message);
            }
        } catch (err: any) {
            console.log(err.message);
        } finally {
            setNewCollectionCreationBoxOpen(false);
        }
    }

    useEffect(() => {
        const handleClick = (e: any) => {
            if (creationBoxRef.current && !creationBoxRef.current.contains(e.target)) {
                setNewCollectionCreationBoxOpen(false);
            }
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [setNewCollectionCreationBoxOpen]);

    return (
        <>
            <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] flex justify-center items-center bg-[#23232399]">
                <div className="w-[350px] bg-[#343434] rounded-xl p-5 flex flex-col gap-5" ref={creationBoxRef}>
                    <div className="text-[#898989] text-center">Enter The Collection Name</div>
                    <input type="text" placeholder='Collection name...' className='outline-none w-full border rounded-xl border-[#454545] py-2 px-2' value={collectionName} onChange={
                        (e) => {
                            setCollectionName(e.target.value);
                        }
                    } />
                    <button className="bg-[#0095f6] rounded-xl py-2" onClick={() => {
                        handleNewCollectionCreation();
                    }}>Create</button>
                </div>
            </div>
        </>
    )
}


const SavedPage = () => {
    const userStates = useUserState();
    const user: UserType | null = userStates?.user;
    const [allSavedCollections, setAllSavedCollection] = useState<SavedPostsFamilyType[]>([]);
    const [newCollectionCreationBoxOpen, setNewCollectionCreationBoxOpen] = useState<boolean>(false);

    const fetchAllSavedPostsOfUser = useCallback(async () => {
        try {
            if (!user)
                return;
            const fetchAllSavedPostsOfUserResponse = await axios.get(
                `http://localhost:4000/api/upload/post/saved/post/all/${user.id}`
            );
            if (fetchAllSavedPostsOfUserResponse.status === 200)
                setAllSavedCollection(fetchAllSavedPostsOfUserResponse.data.posts);
        } catch (error: any) {
            console.log(error.message)
        }
    }, [user]);

    useEffect(() => {
        fetchAllSavedPostsOfUser();
    }, [fetchAllSavedPostsOfUser]);

    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-[#dedede77]">Only you can see what you&apos;ve saved</div>
                    <button className="text-[#0095f6]" onClick={
                        () => {
                            setNewCollectionCreationBoxOpen(true);
                        }
                    }>+ New Collection</button>
                </div>
                <div className="grid grid-cols-3 gap-3 py-3">
                    {
                        allSavedCollections.map((collection) => {
                            return (
                                <SavedCard key={collection.id} collection={collection} collectionName={collection.givenName} />
                            )
                        })
                    }
                </div>
            </div>
            {
                newCollectionCreationBoxOpen &&
                <NewCollectionCreationBox setNewCollectionCreationBoxOpen={setNewCollectionCreationBoxOpen} user={user} />
            }
        </>
    )
}

export default SavedPage
