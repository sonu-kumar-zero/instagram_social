"use client";
import React, { useState } from 'react'
import LoginBox from './LoginBox'
import SignUpBox from './SignUpBox';

const AuthPage = () => {
    const [isloginBox, setLoginBox] = useState<boolean>(true);
    return (
        <div className="px-10 rounded border border-[#dedede44] w-full flex flex-col justify-between h-full">
            <div className="">
                <div className="py-16 flex justify-center items-center">
                    <div className="text-4xl cursor-default">Instagram</div>
                </div>
                {
                    isloginBox ?
                        <LoginBox /> :
                        <SignUpBox setLoginBox={setLoginBox} />
                }
            </div>
            <div className={`${isloginBox ? "py-10" : "py-5"} `}>
                <div className={`h-1 ${isloginBox ? "my-10" : "my-1"} w-full bg-[#23232377]`}></div>
                <div className="py-2 flex flex-col gap-3">
                    <div className="text-center">{isloginBox ? `Don't Have an Account` : "Have an Account! Log IN"}</div>
                    <button className='w-full text-[#dedede] bg-[#0095f6] rounded py-2' onClick={
                        (e) => {
                            setLoginBox(prev => !prev)
                        }
                    }>{isloginBox ? "Sign Up" : "Log In"}</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
