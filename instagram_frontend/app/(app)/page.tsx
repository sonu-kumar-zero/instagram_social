"use client";
import { useUserState } from "@/context/userContext";
import HomePage from "@/pages/HomePage";
import { redirect } from 'next/navigation';


export default function Home() {
  const userState = useUserState();
  const token = userState ? userState.token : null;
  if (token === null ) {
    redirect("/auth");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
