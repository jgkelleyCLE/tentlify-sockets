import tw from 'tailwind-styled-components'
import { Popup } from 'react-map-gl';

export const MapContainer = tw.div`
    relative 
    h-full 
    supports-[height:100cqh]:h-[100cqh]
    supports-[height:100svh]:h-[100svh]
`

export const SearchInput = tw.input`
    bg-gray-100/90
    w-5/6
    max-w-lg
    z-10
    mt-20
    py-2
    px-3
    rounded-full
    text-gray-800
    text-xl
    focus:outline-none
    border-[1px]
    border-gray-400
    
`;

export const MarkerImage = tw.img`
    w-16
    h-16
    object-cover
    border-2
    border-white
    rounded-full
    hover:scale-125
    duration-500
    z-60
    cursor-pointer
    
`;

export const DrawerButton = tw.button`
    bg-white/80
    text-black
    text-2xl 
    p-3 
    rounded-md 
    absolute 
    bottom-24 
    right-2 
    cursor-pointer
    rounded-full
    shadow-xl
    shadow-black/30
`

export const ThemeButton = tw.button`
    bg-white/80
    text-black
    text-2xl 
    p-3 
    rounded-md 
    absolute 
    bottom-10 
    right-2
    rounded-full
    shadow-xl
    shadow-black/30
`

export const PingSpan = tw.span`
    animate-ping
    absolute
    bottom-0
    inline-flex 
    h-full 
    w-full 
    rounded-full  
    opacity-75
    z-0
    background-color: ${({ ringColor }) => ringColor || 'transparent'};
    dark:animate-darkPing
`;

export const PreviewPopup = tw(Popup)`
    w-[550px]
`;

export const StyledPopup = tw(Popup)`
    w-full
    max-w-3xl
    rounded-xl
    shadow-xl
    shadow-black/30
    z-40
    
`;

export const PopupCloseButton = tw.button`
    bg-gray-500/80
    hover:bg-blue-500
    duration-300
    text-white
    text-xl
    absolute 
    top-1 right-1 z-10 p-3 py-1 rounded-md
`;

export const ViewDetailsButton = tw.button`
    bg-green-500/70 
    hover:bg-green-500 
    duration-300 
    rounded-md 
    px-4 
    py-1 
    text-white 
    text-lg 
    w-full
`;

export const PopupImg = tw.img`
    rounded-xl 
    w-full 
    h-60 
    object-cover
`;

export const PopupTitle = tw.h1`
    text-white text-lg
`;

export const PopupDetails = tw.div`
    bg-black/50 
    w-[100%] 
    z-30 
    absolute 
    bottom-0 
    px-2 
    pb-2 
    rounded-b-xl
`;

export const StyledRadio = tw.input`
    w-5
    h-5
`

export const RadioLabel = tw.label`
    text-black
    text-xl
    lg:p-2
`