"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ImageDisplayerProps {
    resolutionWidth: number;
    resolutionHeight: number;
    width: string;
    height: string;
    url: string;
    type: string;
    altText: string;
}

const ImageDisplayer: React.FC<ImageDisplayerProps> = ({ height, url, width, type, altText, resolutionHeight, resolutionWidth }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let url = `http://127.0.0.1:8000/uploads/`;
        if (type === "post") {
            url += "posts/1080_1080.jpg";
        } else if (type === "thumbnail") {
            url += "thumbnails/1080_1920.jpg";
        } else if (type === "profileSmall") {
            url += "profile/100_100.jpg";
        } else if (type === "profileLarge") {
            url += "profile/300_300.jpg";
        };

        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const objectUrl = URL.createObjectURL(blob);
                setImageUrl(objectUrl);
                return () => {
                    URL.revokeObjectURL(objectUrl);
                }
            })
            .catch((err) => console.log("Error While Fetching the Image", err.message));
    }, [type]);

    return (
        <>
            {
                <Image src={imageUrl} width={resolutionWidth} height={resolutionHeight} alt={altText} className={`${width} ${height} object-cover snap-center`} />
            }
        </>
    )
}

export default ImageDisplayer
