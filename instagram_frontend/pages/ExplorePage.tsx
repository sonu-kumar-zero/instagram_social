"use client";
import PostsGridLayout from '@/components/custom/explore/PostsGridLayout'
import { PostType } from '@/types/modelsTypes';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'

const ExplorePage = () => {
    const isLeftLayout = true;
    const gridParentRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [fetchedPages, setFetchedPages] = useState<Set<number>>(new Set());
    const [groupedImages, setGroupedImages] = useState<PostType[][]>([]);

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true);
            if (fetchedPages.has(page)) {
                console.log(`Page ${page} has already been fetched.`);
                return; // Exit the function if the page has already been fetched
            }
            const fetchingRecentPostsResponse = await axios.get(
                `http://localhost:4000/api/recommend/recentPosts?page=${page}`
            );
            if (fetchingRecentPostsResponse.status === 200) {
                const recentPosts10: PostType[] = fetchingRecentPostsResponse.data.post;
                if (recentPosts10.length === 10) {
                    const part1 = recentPosts10.slice(0, 5);
                    const part2 = recentPosts10.slice(5, 10);
                    setGroupedImages((prev) => ([...prev, part1, part2]));
                } else if (recentPosts10.length >= 5) {
                    const part1 = recentPosts10.slice(0, 5);
                    setGroupedImages((prev) => ([...prev, part1]));
                }else{
                    setPage((prev)=>(prev > 1 ? prev-1 : prev ));
                }
                setFetchedPages((prev) => new Set(prev).add(page));
            }

            // setGroupedImages(
            //     (prevImages) => {
            //         if (prevImages.length > 0 && prevImages[prevImages.length - 1].length < 5) {
            //             const imageGroup = prevImages;
            //             imageGroup[imageGroup.length - 1].push(`/images/high/${Math.floor(Math.random() * (14)) + 1}.jpg`);
            //             return imageGroup
            //         };
            //         return [...prevImages, [`/images/high/${Math.floor(Math.random() * (14)) + 1}.jpg`]];
            //     }
            // );
        } catch (error: any) {
            console.error('Error fetching images:', error.message);
        } finally {
            setLoading(false);
        }
    }, [page, fetchedPages]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleScroll = () => {
        if (gridParentRef.current) {
            const { scrollTop, scrollHeight } = gridParentRef.current;
            const { innerHeight } = window;
            if (scrollHeight - innerHeight - 10 < scrollTop) {
                setPage((prev) => prev + 1);
            }
        }
    };

    return (
        <div className="px-40 py-5 flex flex-col gap-1 overflow-y-scroll" onScroll={handleScroll} ref={gridParentRef}>
            {
                groupedImages.length > 0 && groupedImages.map(
                    (imageGroup, index) => {
                        if (imageGroup.length === 5) {
                            return <PostsGridLayout
                                key={index}
                                isLeftLayout={index % 2 === 0 ? !isLeftLayout : isLeftLayout}
                                post1={imageGroup[0]}
                                post2={imageGroup[1]}
                                post3={imageGroup[2]}
                                post4={imageGroup[3]}
                                post5={imageGroup[4]}
                            />
                        } else {
                            return <></>
                        }
                    }
                )
            }
            {
                loading &&
                <div className='flex justify-center py-5'>
                    Loading...
                </div>
            }
        </div>
    )
}

export default ExplorePage