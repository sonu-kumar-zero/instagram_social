import React from 'react'
import ReelsPage from '@/pages/ReelsPage';

interface ReelsPageProps {
  params?: {
    reelId?: string[]
  }
}

const page: React.FC<ReelsPageProps> = ({ params }) => {
  // console.log(params.reelId);
  return (
    <>
      {/* {params.reelId[0]}
      <br />
      {params.reelId[1]} */}
      {/* sonu kumar */}
      <ReelsPage />
    </>
  )
}

export default page
