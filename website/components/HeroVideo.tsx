"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { cn, getAssetPath } from "./ui/utils";

export interface HeroVideoHandle {
    requestFullScreen: () => void;
}

export const HeroVideo = forwardRef<HeroVideoHandle>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFloating, setIsFloating] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useImperativeHandle(ref, () => ({
        requestFullScreen: () => {
            if (videoRef.current) {
                if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                } else if ((videoRef.current as any).webkitRequestFullscreen) {
                    (videoRef.current as any).webkitRequestFullscreen();
                } else if ((videoRef.current as any).msRequestFullscreen) {
                    (videoRef.current as any).msRequestFullscreen();
                }
            }
        }
    }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the container is not intersecting (out of view) and not closed, float it
                if (!entry.isIntersecting && !isClosed) {
                    setIsFloating(true);
                } else {
                    setIsFloating(false);
                }
            },
            {
                threshold: 0.2,
                rootMargin: "-100px 0px 0px 0px"
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [isClosed]);

    // If closed, we stop floating but we still want the video to be in the hero section if we scroll back up.
    // Actually if closed, we might want it to stay closed until we scroll back up?
    // For simplicity: if closed, it stays closed while floating. If we scroll back to hero, it resets (because isFloating becomes false).
    // But wait, if isFloating becomes false, it goes back to hero.
    // So isClosed only applies to the floating state.

    const shouldFloat = isFloating && !isClosed;

    const handleFloatingClick = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if ((videoRef.current as any).webkitRequestFullscreen) {
                (videoRef.current as any).webkitRequestFullscreen();
            } else if ((videoRef.current as any).msRequestFullscreen) {
                (videoRef.current as any).msRequestFullscreen();
            }
        }
    };

    return (
        <>
            {/* Placeholder to maintain layout space */}
            <div ref={containerRef} className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
                {/* The Video Container */}
                <div
                    className={`
            transition-all duration-500 ease-in-out
            ${shouldFloat
                            ? "fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-xl shadow-2xl border-4 border-white/20 cursor-pointer group"
                            : "absolute inset-0 w-full h-full rounded-2xl shadow-2xl border-4 border-white/20"
                        }
            overflow-hidden bg-black
          `}
                    onClick={shouldFloat ? handleFloatingClick : undefined}
                >
                    {shouldFloat && (
                        <>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsClosed(true);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            {/* Fullscreen hint */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                <div className="bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
                                    Click for fullscreen
                                </div>
                            </div>
                        </>
                    )}

                    <video
                        ref={videoRef}
                        src={getAssetPath("/videos/demo.mp4")}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={!shouldFloat}
                    />

                    {/* Overlay for Hero mode only */}
                    {!shouldFloat && (
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
                    )}
                </div>
            </div>
        </>
    );
});

HeroVideo.displayName = "HeroVideo";
