
import React from 'react'
import PicturePage from '@/components/custom/posts_profile/PicturePage'

interface PageProps {
  params: {
    userId: string
  }
}


const page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <PicturePage userName={params.userId} />
    </>
  )
}

export default page
