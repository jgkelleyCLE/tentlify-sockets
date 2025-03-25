import tw from 'tailwind-styled-components';

export const DataCard = tw.div`
    w-11/12
    max-w-[500px]
    p-2
    rounded-lg
    shadow-lg
    shadow-black/30
    m-3
    flex
    flex-col
    items-center
`;

export const TableRow = tw.tr`
    flex
    items-center
    justify-start
    w-full
   
`;

export const DataCell = tw.td`
    flex
    self-start
    mx-0
    my-2
`;

export const DataCellQty = tw.td`
    flex
    text-xl
    font-medium
    text-left
    mr-8
`;

export const DataCellItem = tw.td`
    flex
    text-xl
    text-left
    mx-0
`;

export const Checkbox = tw.input`
    w-7
    h-7
    mr-4
    ml-2
    
    self-start
`;

export const TableBody = tw.table`
    w-full
    rounded-sm
    even:bg-gray-300
    odd:dark:bg-gray-400
    dark:even:text-gray-800
    dark:odd:text-gray-800
`;

export const TableHeader = tw.th`
    bg-white
    text-xl
    font-light
    bg-gray-600
    text-gray-300
    p-2
    flex
    items-center
    justify-center
    w-full
    rounded-t-lg
`;

export const FavoriteButton = tw.button`
    bg-gray-500 
    w-9/12
    max-w-[300px]
    mt-2 
    px-4 
    py-2 
    text-gray-300 
    text-xl 
    rounded-lg 
    shadow-lg 
    flex 
    items-center 
    justify-center
`;
