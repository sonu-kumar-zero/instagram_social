import React from "react";

export default function UserProfileLayout({
    children,
    settings
}: {
    children: React.ReactNode,
    settings: React.ReactNode,
}) {
    return (
        <div className="overflow-y-scroll w-full flex">
            <div className="w-[25dvw]">
                {children}
            </div>
            <div className="w-full">
                {settings}
            </div>
        </div>
    );
}


