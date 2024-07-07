// M3U8Player.tsx
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface M3U8PlayerProps {
  url: string;
  index: number;
  currentIdx: number;
}

const M3U8Player: React.FC<M3U8PlayerProps> = ({ url, index, currentIdx }) => {
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (index === currentIdx) {
      setVideoPlaying(true);
    } else {
      setVideoPlaying(false);
    }
  }, [currentIdx, index]);


  return (
    <>
      <div className="min-w-[450px] h-full flex justify-end items-center snap-center object-cover">
        <div className="player-wrapper min-w-[450px] h-full object-cover bg-[#090909]">
          <ReactPlayer
            url={url}
            playing={videoPlaying}
            // controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </>
  );
};

export default M3U8Player;

