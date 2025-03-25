import tw from 'tailwind-styled-components'

export const MobileCard = tw.div`
    flex
    items-center
    justify-between
    w-11/12
    shadow-md
    shadow-black/30
    rounded-lg
    my-1
    bg-gray-100
    p-[2px]
    relative
    max-w-xl
   
`

export const CardImage = tw.img`
    rounded-l-lg
    w-[55%]
    object-cover
    p-0
`

export const CardDetails = tw.div`
    flex
    flex-col
    items-center
    p-2
`

// export const TrashIcon = tw(FaRegTrashAlt)`
//     text-red-600
//     absolute
//     bottom-1
//     right-2
//     text-xl
//     cursor-pointer
//     z-20
// `

export const CardTitle = tw.h3`
    text-lg
    
`