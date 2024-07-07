"use client";
import React, { useState } from 'react'
import axios from "axios";

interface SignUpBoxProps {
    setLoginBox: React.Dispatch<React.SetStateAction<boolean>>;
}


const SignUpBox: React.FC<SignUpBoxProps> = ({setLoginBox}) => {

    const [formData, setFormData] = useState<
        { email: string, userName: string, password: string, confirmPassword: string }
    >({
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
    });

    const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFormData((prev) => (
            { ...prev, [target.name]: target.value }
        ))
    };

    const handleSignUp = async () => {
        try {
            console.log(formData);
            if (formData.password === formData.confirmPassword && formData.password !== "" && formData.email !== "" && formData.userName !== "") {
                const signUpRespose = await axios.post(`http://127.0.0.1:4000/api/user/register`, {
                    ...formData
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                console.log(signUpRespose);
                if (signUpRespose.status === 200) {
                    setLoginBox(true);
                }
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <>
            <form className='flex flex-col gap-1 '>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='userName' className='text-xs text-[#dedede66]'>UserName</label>
                    <input type='text' placeholder='' id='userName' name='userName' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.userName} onChange={onInputValueChange} />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='email' className='text-xs text-[#dedede66]'>Email</label>
                    <input type='text' placeholder='' id='email' name='email' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.email} onChange={onInputValueChange} />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='password' className='text-xs text-[#dedede66]'>Password</label>
                    <input placeholder='' type='password' id='password' name='password' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.password} onChange={onInputValueChange} />
                </div>
                <div className="flex flex-col bg-[#23232377] border border-[#dedede44] rounded px-2 py-1 gap-1">
                    <label htmlFor='confirmPassword' className='text-xs text-[#dedede66]'>Confirm Password</label>
                    <input placeholder='' type='password' id='confirmPassword' name='confirmPassword' className='text-sm outline-none w-full bg-transparent focus:bg-transparent' value={formData.confirmPassword} onChange={onInputValueChange} />
                </div>
                <div className="py-2">
                    <button className='w-full text-[#dedede] bg-[#0095f6] rounded py-2' onClick={
                        (e) => {
                            e.preventDefault();
                            handleSignUp();
                        }
                    }>Sign Up</button>
                </div>
            </form>
        </>
    )
}

export default SignUpBox
