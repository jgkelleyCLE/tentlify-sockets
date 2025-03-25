import tw from 'tailwind-styled-components';

export const CalcBox = tw.div`
    w-11/12
    max-w-[500px]
    bg-gray-200
    p-2
    rounded-lg
    
    shadow-black/30
    m-1.5
    flex
    flex-col
    items-center
`;

export const SearchInput = tw.input`
    w-11/12
    max-w-[500px]
    border-2
    border-gray-400
    rounded-md
    p-2
    text-xl
    my-2
`;

export const CalcButton = tw.button`
    bg-green-400
    text-white
    text-lg
    font-medium
    p-1.5
    rounded-md
    mt-2
    hover:bg-green-500
    transition
    duration-300
    w-full
`;

export const NumInput = tw.input`
    rounded-md
    w-1/2
    p-2
`;
