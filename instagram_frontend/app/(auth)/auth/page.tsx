import React from 'react'
import Image from "next/image";
import Footer from '@/components/custom/common/Footer';
import AuthPage from '@/components/custom/auth/AuthPage';

const page = () => {
    return (
        <div className='flex justify-center w-[100dvw] flex-col items-center h-[100dvh] overflow-y-scroll pt-20'>
            <div className="flex gap-10 items-start h-[600px] w-[60dvw]">
                <div className="w-1/2 flex justify-end">
                    <Image src={"/images/website/insta_mobile_screen.png"} width={400} height={700} alt='instagram_mobile_screen' className='w-fit h-[600px] object-contain ' />
                </div>
                <div className="h-full w-2/5">
                    <AuthPage />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page
