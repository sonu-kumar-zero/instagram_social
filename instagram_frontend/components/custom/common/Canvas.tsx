"use client";
import React, { useEffect, useRef } from 'react';

interface ConicalRainbowCircleProps {
    width: number;
    height: number;
}

const ConicalRainbowCircle: React.FC<ConicalRainbowCircleProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2;

        const colors = [
            '#F58529', // Orange
            '#FEDA77', // Yellow
            '#DD2A7B', // Pink
            '#8134AF', // Purple
            '#515BD4', // Blue
        ];

        let angle = 0;

        const drawGradient = () => {
            ctx.clearRect(0, 0, width, height);
            const gradient = ctx.createConicGradient(angle, centerX, centerY);

            colors.forEach((color, index) => {
                gradient.addColorStop(index / colors.length, color);
            });
            gradient.addColorStop(1, colors[0]); // Close the loop

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
        };

        let animationId: number | null = null;
        const animate = () => {
            angle += 0.03; // Increment the angle for rotation
            drawGradient();
            animationId = requestAnimationFrame(animate);
        };

        animate(); // Start the animation

        return () => {
            if (animationId){
                cancelAnimationFrame(animationId);
            }
        }
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ display: 'block', margin: '0 auto' }}
        />
    );
};

export default ConicalRainbowCircle;
