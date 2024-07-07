// "use client";
import React from 'react';
import ProfilePage from "@/pages/ProfilePage";

interface PageProps {
  params: {
    userId: string
  }
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <ProfilePage userName={params.userId} />
    </>
  )
}

export default Page
