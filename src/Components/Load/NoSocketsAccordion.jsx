import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Divider,
    Avatar,
    useToast,
    Spinner
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { useGetMutatedTentQuery, useUpdateMutatedTentMutation } from '../../redux/mutatedApi'

let endpoint = "http://localhost:3001"
let socket

const NoSocketsAccordion = ({ item }) => {

    const user = useSelector(state => state.auth.user);
    const toast = useToast();
    const [loaded, setLoaded] = useState(0);
    const [parts, setParts] = useState(item.parts);
    const [completingPartId, setCompletingPartId] = useState(null);
    const [updateMutatedTent, { data: updateData, isLoading, isSuccess, isError, error }] = useUpdateMutatedTentMutation()

    const { data: tent, isSuccess: getSuccess, isError: isGetError, isLoading: getLoading, error: getError, refetch } = useGetMutatedTentQuery(item?._id);

    // Initialize accordion state from localStorage
    const initialAccordionState = JSON.parse(localStorage.getItem('accordionState')) || {};
    const [accordionState, setAccordionState] = useState(initialAccordionState);



    useEffect(() => {
        // Initialize socket connection
        socket = io(endpoint);

        socket.on('connect', () => {
            console.log("Connected to server");
        });

        socket.on('itemToggled', ({ part, user }) => {
            console.log("Received itemToggled event: ", part, user);
            setParts(prevParts => {
                const updatedParts = prevParts.map(p => p._id === part._id ? part : p);
                console.log("Updated parts: ", updatedParts);
                return updatedParts;
            });

        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
            console.log("Disconnected from server");
        };
    }, []);

    // Update localStorage whenever accordionState changes
    useEffect(() => {
        localStorage.setItem('accordionState', JSON.stringify(accordionState));
    }, [accordionState]);

    const handleAccordionToggle = (index) => {
        setAccordionState(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    

    const handleCompletePart = async (part) => {
        const updatedPart = { ...part, completed: !part.completed, completedBy: !part.completed ? user : null };

        // Save the updated part to the database
        try {
            setCompletingPartId(part._id);
            await updateMutatedTent({ id: item._id, partId: updatedPart._id, updatedPart }).unwrap();
            // Update the state only after the database update is successful
            setParts(prevParts => {
                const updatedParts = prevParts.map(p => p._id === updatedPart._id ? updatedPart : p);
                return updatedParts;
            });
            setCompletingPartId(null);
            // Emit the event to the server
            socket.emit('toggleItemComplete', { part: updatedPart, user });
            refetch()
        } catch (err) {
            console.error("Failed to update part: ", err);
            setCompletingPartId(null);
            if (isError) {
                toast({
                    title: "Error",
                    description: "Failed to update the part.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };

  

    useEffect(() => {
        const completedCount = parts.filter(part => part.completed).length;
        setLoaded(completedCount);
    }, [parts]);

    const allLoaded = loaded === item.parts.length;

  return (
    <div className="w-full">
    <Accordion allowMultiple className="w-full">
        <AccordionItem className="w-full my-1 rounded-md" >
            <h2 className="w-full">
                <AccordionButton className={`w-full ${allLoaded ? 'bg-green-200 hover:bg-green-300 rounded-md' : 'bg-gray-100 rounded-md '}`}>
                    <Box as='span' flex='1' textAlign='left'>
                        {item.product} - {loaded} / {item.parts.length} - {(loaded / item.parts.length * 100).toFixed(0)}%
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className="w-full">
                
                {/* {tent?.parts.map(part => (  */}
                {parts.map(part => ( 
                    <div
                        key={part._id}
                        className={` ${part.completed ? 'bg-green-100 border-green-300' : 'bg-gray-100'} flex items-center justify-start p-2 bg-gray-100 rounded-md my-1 cursor-pointer border-2 border-gray-300 relative mx-auto`}
                        
                        onClick={()=> handleCompletePart(part)}
                    >
                        <div className="">
                        {completingPartId === part._id ? <Spinner thickness='3px'
                         className="absolute top-2 left-3 z-40" /> : null}
                        {part.completed && part.completedBy && (
                            <Avatar size="xs" name={part?.completedBy.username} src={part?.completedBy.image} className="ml-2" />
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

export default NoSocketsAccordion