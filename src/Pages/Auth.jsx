import React from 'react'
import OAuth from '../Components/OAuth/OAuth'
import { FlexColumn } from '../Components/UI'

const Auth = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="https://videos.pexels.com/video-files/1436812/1436812-uhd_2732_1440_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <FlexColumn className="relative z-10 justify-center">
        <div className="w-11/12 max-w-[600px] bg-black/60 flex flex-col items-center p-12 rounded-md shadow-md shadow-black/20">
          <OAuth />
        </div>
      </FlexColumn>
    </div>
  )
}

export default Auth