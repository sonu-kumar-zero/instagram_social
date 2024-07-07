"use client";
import { Property } from '@/types/uploadTypes';
import React, { useEffect, useRef, useState } from 'react'

interface FrontImageDisplayerProps {
    imageSrc: string | ArrayBuffer | null | undefined;
    propertList: Property[];
    currentIdx: number;
}

const FrontImageDisplayer: React.FC<FrontImageDisplayerProps> = ({ currentIdx, propertList, imageSrc }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // const getBackgroundImage = () => {
    //     if (files && files[currentIdx]) {
    //         try {
    //             return `url(${URL.createObjectURL(files[currentIdx])})`;
    //         } catch (error) {
    //             console.error("Failed to create object URL", error);
    //             return "";
    //         }
    //     }
    //     return "";
    // };

    // useEffect(() => {
    //     const currentFilterOfImage = () => {
    //         if (propertList.length < 0)
    //             return;
    //         const filters = propertList[currentIdx]?.DEFAULT_OPTIONS.map(
    //             (option) => {
    //                 if (option.name === "Vignette") return "";
    //                 return `${option.property}(${option.value}${option.unit})`;
    //             }
    //         );

    //         const filter = filters?.join(" ");
    //         if (filter)
    //             setCurrentFilters(filter);
    //     };
    //     currentFilterOfImage();
    // }, [currentIdx, files, propertList]);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;
        if (imageSrc && typeof (imageSrc) === "string") {
            const img = new Image();

            img.onload = () => {
                const canvasAspectRatio = canvas.width / canvas.height;
                const imageAspectRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;
                const scale = propertList[currentIdx].scale;

                if (canvasAspectRatio > imageAspectRatio) {
                    drawWidth = canvas.width * scale;
                    drawHeight = drawWidth / imageAspectRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height * scale;
                    drawWidth = drawHeight * imageAspectRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                const filters = propertList[currentIdx].DEFAULT_OPTIONS.map(
                    (option) => {
                        if (option.name === "Vignette") return "";
                        return `${option.property}(${option.value}${option.unit})`;
                    }
                );

                const filter = filters.join(" ");

                const radialGradient = ctx.createRadialGradient(
                    canvas.width / 2,
                    canvas.height / 2,
                    0,
                    canvas.width / 2,
                    canvas.height / 2,
                    Math.abs(Math.max(canvas.width, canvas.height) / 2)
                );

                radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                radialGradient.addColorStop(1, `rgba(0, 0, 0, ${propertList[currentIdx].DEFAULT_OPTIONS[7].value / 100})`);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.filter = filter;
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                ctx.fillStyle = radialGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

            };
            img.src = imageSrc;
        }
    }, [imageSrc, canvasRef, currentIdx, propertList]);



    return (
        <>
            <canvas ref={canvasRef} width={1080} height={1080} className='w-[580px] h-[72dvh] rounded-b-xl' />
        </>
    )
}

export default FrontImageDisplayer
