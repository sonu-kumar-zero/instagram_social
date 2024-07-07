import Link from 'next/link';
import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const options = [
    {
        type: "title",
        content: "How you use Instagram"
    },
    {
        type: "nav",
        content: "Edit Profile",
        icon: <svg aria-label="" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle><path d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle></svg>,
        link: "edit"
    },
    {
        type: "title",
        content: "Who can see your account"
    },
    {
        type: "nav",
        content: "Account Privacy",
        icon: <svg aria-label="" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title></title><path d="M6.71 9.555h10.581a2.044 2.044 0 0 1 2.044 2.044v8.357a2.044 2.044 0 0 1-2.043 2.043H6.71a2.044 2.044 0 0 1-2.044-2.044V11.6A2.044 2.044 0 0 1 6.71 9.555Zm1.07 0V6.222a4.222 4.222 0 0 1 8.444 0v3.333" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>,
        link: "privacy_setting"
    }
]

const page = () => {
    return (
        <>
            <div className="px-5 pt-5 border-r border-[#454545] h-[100dvh] overflow-y-scroll">
                <div className="font-semibold text-xl p-5">Settings</div>
                {
                    options.map((op, index) => {
                        if (op.type === "title")
                            return (
                                <div key={index} className="px-5 py-3 text-xs text-[#dedede77]">{op.content}</div>)

                        return (
                            <Link key={index} href={`/accounts/${op.link}`} className="px-5 py-3 hover:bg-[#565656] flex gap-3 rounded-xl items-center">
                                <div className="">
                                    {op.icon}
                                </div>
                                <div className="">
                                    {op.content}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default page
