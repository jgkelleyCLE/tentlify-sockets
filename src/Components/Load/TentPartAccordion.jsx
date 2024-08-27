// import React, { useState } from 'react'
// import {
//     Accordion,
//     AccordionItem,
//     AccordionButton,
//     AccordionPanel,
//     AccordionIcon,
//     Box,
//     Divider,
//     Avatar,
//     Checkbox
//   } from '@chakra-ui/react'
// import { useSelector } from 'react-redux'
// import { FaCheck } from 'react-icons/fa'

// const TentPartAccordion = ({ item }) => {

//     const [loaded, setLoaded] = useState(0)
//     const [parts, setParts] = useState(item.parts.map(part => ({ ...part, completed: false })));
    

//     console.log("ITEM: ", item)

//     const user = useSelector(state => state.auth.user)
//     const handleToggleComplete = (index) => {
//         const newParts = item.parts.map((part, i) => 
//           i === index ? { ...part, completed: !part.completed } : part
//         );
//         setParts(newParts);
//         setLoaded(newParts.filter(part => part.completed).length);
//       };

//       const allLoaded = loaded === item.parts.length;


//   return (

// <div className="w-full">
//       <Accordion allowMultiple className="w-full">
//         <AccordionItem className="w-full my-1 rounded-md">
//           <h2 className="w-full">
//             <AccordionButton className={`w-full ${allLoaded ? 'bg-green-200 hover:bg-green-300 rounded-md' : 'bg-gray-100 rounded-md hover:bg-gray-200'}`}>
//               <Box as='span' flex='1' textAlign='left'>
//                 {item.product} - {loaded} / {item.parts.length} - {(loaded / item.parts.length * 100).toFixed(0)}%
//               </Box>
//               <AccordionIcon />
//             </AccordionButton>
//           </h2>
//           <AccordionPanel pb={4} className="w-full">
//             {parts.map((part, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-start p-2 bg-gray-100 rounded-md my-1 cursor-pointer border-2 border-gray-300"
//                 onClick={() => handleToggleComplete(index)}
//               >
//                 <div>
//                   {part.completed ? <Avatar size="sm" name={user.username} src={user.image} /> : null}
//                 </div>
//                 <Divider className="mx-4" orientation='vertical' />
//                 <p>{part.quantity}</p>
//                 <Divider className="text-black mx-4" orientation='vertical' />
//                 <p>{part.item}</p>
//               </div>
//             ))}
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     </div>

//   )
// }

// export default TentPartAccordion

import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Divider,
    Avatar,
    Checkbox,
    useToast
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import io from 'socket.io-client'
import { useUpdateTentPartMutation } from '../../redux/tentApi'

let endpoint = "http://localhost:3001"
let socket

const TentPartAccordion = ({ item }) => {

    const toast = useToast()

    const [loaded, setLoaded] = useState(0)
    

    const [parts, setParts] = useState(item.parts);
    
    const [updateTentPart, { data: updateData, isSuccess: updateSuccess, isError: updateError, error }] = useUpdateTentPartMutation();
    

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        socket = io(endpoint);

        socket.on('connect', () => {
            console.log("Connected to server");
            
        });

        
        return () => {
            socket.disconnect();
            console.log("Disconnected from server");
        };

        
    });

   


    // const handleItemClick = (partId) => {
    //     console.log("clicked part: ", partId)
    //     socket.emit('toggleItemComplete', { partId, user });
    //     handleToggleComplete(partId);
    // };
    

    // const handleToggleComplete = async (partId) => {
    //     const newParts = parts.map(part =>
    //         part._id === partId ? { ...part, completed: !part.completed } : part
    //     );
    //     setParts(newParts);
    
    //     socket.emit('updateTentPart', { id: item._id, parts: newParts });
    
    //     try {
    //         await updateTentPart({ id: item._id, parts: newParts }).unwrap();
    //         // setUpdateSuccess(true);
    //     } catch (error) {
    //         console.error('Error updating tent parts:', error);
    //         // setUpdateError(true);
    //     }
    // };

    const handleCompletePart = async(part) => {
        console.log("clicked part: ", part)
        socket.emit('testClick', { part, user });
    }
    

    useEffect(()=> {

        if(updateSuccess){
            toast({
                title: "Update success",
            })
            console.log("Update success")
        }else if(updateError){
            toast({
                title: "Update error",
            })
            console.log("Update error")
        }

    }, [updateSuccess, updateError])

    useEffect(() => {
        const completedCount = parts.filter(part => part.completed).length;
        setLoaded(completedCount);
    }, [parts]);

    const allLoaded = loaded === item.parts.length;

    return (
        <div className="w-full">
            <Accordion allowMultiple className="w-full">
                <AccordionItem className="w-full my-1 rounded-md">
                    <h2 className="w-full">
                        <AccordionButton className={`w-full ${allLoaded ? 'bg-green-200 hover:bg-green-300 rounded-md' : 'bg-gray-100 rounded-md hover:bg-gray-200'}`}>
                            <Box as='span' flex='1' textAlign='left'>
                                {item.product} - {loaded} / {item.parts.length} - {(loaded / item.parts.length * 100).toFixed(0)}%
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} className="w-full">
                        {parts.map((part, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-start p-2 bg-gray-100 rounded-md my-1 cursor-pointer border-2 border-gray-300"
                                // onClick={() => handleItemClick(index)}
                                // onClick={() => handleItemClick(part._id)}
                                onClick={()=> handleCompletePart(part)}
                            >
                                <div>
                                {part.completedBy && (
                                    <Avatar className="" size="sm" name={part.completedBy.username} src={part.completedBy.image} />
                                )}
                                </div>
                                <Divider className="mx-4" orientation='vertical' />
                                <p>{part.quantity}</p>
                                <Divider className="text-black mx-4" orientation='vertical' />
                                <p>{part.item}</p>
                            </div>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default TentPartAccordion