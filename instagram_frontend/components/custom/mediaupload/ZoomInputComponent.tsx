"use client";
import { Property } from '@/types/uploadTypes';
import React, { useEffect, useRef, useState } from 'react'

interface ZoomInputComponentProps {
    setZoomVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setPropertList: React.Dispatch<React.SetStateAction<Property[]>>;
    zoomValue: number;
    currentIdx: number;
}

const ZoomInputComponent: React.FC<ZoomInputComponentProps> = ({ setZoomVisible, zoomValue, setPropertList,currentIdx }) => {
    const zoomSliderInputRef = useRef<HTMLDivElement>(null);

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const newScale = (Number(e.target.value) + 100) / 100;

        setPropertList(prev =>
            prev.map((item, index) =>
                index === currentIdx ? { ...item, scale: newScale } : item
            )
        );
    };

    useEffect(() => {
        const handleOnClick = (e: any) => {
            const current = zoomSliderInputRef.current;
            if (current && !current.contains(e.target)) {
                setZoomVisible(false);
            }
        }

        document.addEventListener("click", handleOnClick);
        return () => {
            document.removeEventListener("click", handleOnClick);
        }
    }, [setZoomVisible]);

    return (
        <>
            <div className="bg-[#121212aa] px-2 rounded-xl flex items-center py-4" ref={zoomSliderInputRef} >
                <input type="range" id="zoom" name="zoom" min="0" max="100" step="1" className='p-0 h-1 m-0 bg-white range-input appearance-none rounded-xl focus:outline-none cursor-pointer' value={zoomValue * 100 - 100}
                    onChange={handleZoomChange}
                />
            </div>
        </>
    )
}

export default ZoomInputComponent
