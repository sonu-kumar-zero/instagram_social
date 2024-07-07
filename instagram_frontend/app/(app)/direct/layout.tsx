import React from "react";

export default function UserProfileLayout({
    children,
    message,
}: {
    children: React.ReactNode,
    message: React.ReactNode
}) {
    return (
        <div className="overflow-y-scroll w-full flex">
            <div className="w-[28%]">
                {children}
            </div>
            <div className="w-[72%]">
                {message}
            </div>
        </div>
    );
}


