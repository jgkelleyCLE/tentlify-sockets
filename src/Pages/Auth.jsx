import React from 'react';
import OAuth from '../Components/OAuth/OAuth';
import { FlexColumn } from '../Components/UI';

const Auth = () => {
  const videoUrl =
    'https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FLoopLapse_HB.mp4?alt=media&token=da49607c-50c5-49b3-841a-a8b7d60e7f51';

  const imgUrl =
    'https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FIMG_5803.jpg?alt=media&token=60dbfc4c-6d14-4389-ac31-a281c8c4e942';

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <video autoPlay loop muted src={videoUrl} className="absolute top-0 left-0 w-screen h-screen object-cover" />

      <img src={imgUrl} className="absolute w-full h-screen object-cover top-0 block md:hidden" />

      <FlexColumn className="relative z-10 justify-center">
        <div className="w-11/12 max-w-[600px] bg-black/60 flex flex-col items-center p-12 rounded-md shadow-md shadow-black/20">
          <OAuth />
        </div>
      </FlexColumn>
    </div>
  );
};

export default Auth;
