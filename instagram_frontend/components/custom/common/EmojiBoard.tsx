"use client";
import React, { useEffect, useRef, useState } from 'react'
import { humanEmoji, animalsAndNatureEmoji, foodsAndDrinksEmoji, activites, travel, heartEmoji } from "@/data/emojiList";

interface EmojiBoardProps {
    setIsEmojiBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserCommentString: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiBoard: React.FC<EmojiBoardProps> = ({ setIsEmojiBoardOpen, setUserCommentString }) => {

    const emojiBoardRef = useRef<HTMLDivElement>(null);

    const handleStringAppend = (val: string) => {
        setUserCommentString((prev) => (prev + val));
    };

    useEffect(() => {
        const handleClick = (e: any) => {
            if (!emojiBoardRef.current?.contains(e.target))
                setIsEmojiBoardOpen(false);
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [setIsEmojiBoardOpen]);

    return (
        <>
            <div className="bg-[#292929] py-3 rounded-xl emoji-board" ref={emojiBoardRef}>
                <div className='px-2  w-[350px] h-[300px] grid grid-cols-7 overflow-y-scroll gap-1 no-select'>
                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Suggestions</div>
                    {
                        heartEmoji.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }
                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Emoji</div>
                    {
                        humanEmoji.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }
                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Activites</div>
                    {
                        activites.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }
                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Animal And Nature</div>
                    {
                        animalsAndNatureEmoji.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }
                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Foods And Drinks</div>
                    {
                        foodsAndDrinksEmoji.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }

                    <div className="col-span-7 px-1 font-semibold text-[#787878]">Travel</div>
                    {
                        travel.map((em, index) => {
                            return (
                                <div key={index} className='col-span-1 w-full text-3xl p-1 hover:bg-[#454545] cursor-pointer flex justify-center items-center rounded-md'
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                        }
                                    }

                                >
                                    <span onClick={() => {
                                        handleStringAppend(em.value);
                                    }}>
                                        {em.icon}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default EmojiBoard
