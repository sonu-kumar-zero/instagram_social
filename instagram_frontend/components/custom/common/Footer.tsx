import React from 'react'

const options: string[] = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Locations", "Instagram Lite", "Threads", "Contact Uploading & Non-Users", "Meta Verified"]

const Footer = () => {
    return (
        <div className='px-40 py-10'>
            <div className="px-10 flex flex-col gap-5 items-center">
                <div className="flex flex-wrap gap-3 justify-center">
                    {
                        options.map((op, index) => {
                            return (
                                <span key={index} className='text-xs text-[#dedede55] hover:text-[#dededeaa] cursor-pointer'>{op}</span>
                            )
                        })
                    }
                </div>
                <div className="flex gap-3">
                    <span className='text-xs text-[#dedede55] hover:text-[#dededeaa] cursor-default'>English</span>
                    <span className='text-xs text-[#dedede55] hover:text-[#dededeaa] cursor-default'>© 2024 Instagram from Sonu</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
