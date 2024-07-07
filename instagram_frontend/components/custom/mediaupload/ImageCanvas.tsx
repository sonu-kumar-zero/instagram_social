"use client";
import { Property } from '@/types/uploadTypes';
import React, { useRef, useEffect } from 'react';

interface ImageCanvasProps {
    imageSrc: string | ArrayBuffer | null | undefined;
    propertList: Property[];
    currentIdx: number;
    files: File[];
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>
}

const Canvas: React.FC<ImageCanvasProps> = ({ imageSrc, propertList, currentIdx, files, setCurrentIdx }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
            <div className="relative">
                <canvas ref={canvasRef} width={1080} height={1080} className='w-[580px] h-[72dvh] rounded-bl-xl' />
                {
                    files.length > 0 &&
                    currentIdx < files.length - 1 &&
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <button className='bg-[#121212aa] p-3 rounded-full' onClick={
                            () => setCurrentIdx((prev) => {
                                if (prev < files.length - 1) {
                                    return prev + 1;
                                };
                                return prev;
                            })}>
                            <svg aria-label="Right chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Right chevron</title><polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                        </button>
                    </div>
                }
                {
                    files.length > 0 &&
                    currentIdx > 0 && currentIdx < files.length &&
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <button className='bg-[#121212aa] p-3 rounded-full' onClick={
                            () => setCurrentIdx((prev) => {
                                if (prev > 0) {
                                    return prev - 1;
                                };
                                return prev;
                            })}>
                            <svg aria-label="Left chevron" className="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Left chevron</title><polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                        </button>
                    </div>
                }
            </div>
        </>
    )
};

export default Canvas;
