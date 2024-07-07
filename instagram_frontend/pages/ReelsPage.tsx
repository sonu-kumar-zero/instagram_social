"use client";
import ReelsCard from '@/components/custom/reels/ReelsCard'
import { useUserState } from '@/context/userContext';
import { ReelType, UserType } from '@/types/modelsTypes';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface ReelsPageProps {
}

const ReelsPage: React.FC<ReelsPageProps> = () => {
    const userStates = useUserState();
    const user: UserType | null = userStates?.user;
    const [audioPlaying, setAudioPlaying] = useState<boolean>(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [reelList, setReelList] = useState<ReelType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastFetchedPage, setLastFetchedPage] = useState<number>(0);

    const fetchReelsAccordingToPage = useCallback(async () => {
        try {
            if (page === lastFetchedPage) {
                console.log(`Page ${page} has already been fetched.`);
                return; // Exit the function if the page has already been fetched
            };
            // console.log({ page, lastFetchedPage });
            const fetchReelsAccordingToPageResponse = await axios.get(
                `http://localhost:4000/api/recommend/recentReels?page=${page}`
            );
            if (fetchReelsAccordingToPageResponse.status === 200) {
                console.log(fetchReelsAccordingToPageResponse.data);
                if (fetchReelsAccordingToPageResponse.data.reel.length === 0) {
                    setPage((prev) => (prev > 1 ? prev - 1 : prev));
                } else {
                    setReelList((prev) => [...prev, ...fetchReelsAccordingToPageResponse.data.reel]);
                    setLastFetchedPage(page);
                }
            };
        } catch (error: any) {
            console.log(error.message);
        }
    }, [page, lastFetchedPage]);

    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setPage(
                            (prev) => {
                                return prev + 1;
                            }
                        );
                    }
                },
                { threshold: 1.0 }
            );
        }

        const observer = observerRef.current;
        const reelsLength = reelList.length;

        if (reelsLength > 2) {
            const thirdLastReel = document.getElementById(`reel-${reelsLength - 3}`);
            if (thirdLastReel) {
                observer.observe(thirdLastReel);
            }
            return () => {
                if (thirdLastReel) {
                    observer.unobserve(thirdLastReel);
                }
            };
        }
    }, [reelList]);

    useEffect(() => {
        fetchReelsAccordingToPage();
    }, [fetchReelsAccordingToPage]);

    return (
        <div className="h-[100dvh] w-full overflow-y-scroll flex flex-col items-center snap-mandatory snap-y pr-28">
            <div className="w-full h-[16px]">&nbsp;</div>
            {
                reelList.map((reel, idx) => {
                    return (
                        <div key={reel.id} id={`reel-${idx}`}>
                            <ReelsCard user={user} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} reel={reel} />
                            <div className="w-full h-[16px]">&nbsp;</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReelsPage
