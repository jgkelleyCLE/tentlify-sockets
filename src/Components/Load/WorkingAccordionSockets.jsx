import React, { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import io from 'socket.io-client';
import { useUpdateTentPartMutation } from '../../redux/tentApi';

let endpoint = 'http://localhost:3001';
let socket;

const TentParts = ({ item }) => {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const [loaded, setLoaded] = useState(0);
  const [parts, setParts] = useState(item.parts);
  const [
    updateTentPart,
    { data: updateData, isSuccess: updateSuccess, isError: updateError, error },
  ] = useUpdateTentPartMutation();

  console.log(`Item in `, item);

  useEffect(() => {
    // Initialize socket connection
    socket = io(endpoint);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('itemToggled', ({ part }) => {
      console.log('Received itemToggled event: ', part);
      setParts((prevParts) => {
        const updatedParts = prevParts.map((p) => (p._id === part._id ? part : p));
        console.log('Updated parts: ', updatedParts);
        return updatedParts;
      });
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  const handleCompletePart = async (part) => {
    const updatedPart = { ...part, completed: !part.completed, completedBy: !part.completed ? user : null };
    console.log('Emitting toggleItemComplete event: ', updatedPart);
    socket.emit('toggleItemComplete', { part: updatedPart, user });
  };

  useEffect(() => {
    const completedCount = parts.filter((part) => part.completed).length;
    setLoaded(completedCount);
  }, [parts]);

  const allLoaded = loaded === item.parts.length;

  return (
    <div className="w-full">
      <Accordion allowMultiple className="w-full">
        <AccordionItem className="w-full my-1 rounded-md">
          <h2 className="w-full">
            <AccordionButton
              className={`w-full ${
                allLoaded ? 'bg-green-200 hover:bg-green-300 rounded-md' : 'bg-gray-100 rounded-md hover:bg-gray-200'
              }`}
            >
              <Box as="span" flex="1" textAlign="left">
                {item.product} - {loaded} / {item.parts.length} - {((loaded / item.parts.length) * 100).toFixed(0)}%
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="w-full">
            {parts.map((part) => (
              <div
                key={part._id}
                className="flex items-center justify-start p-2 bg-gray-100 rounded-md my-1 cursor-pointer border-2 border-gray-300"
                onClick={() => handleCompletePart(part)}
              >
                <div>
                  {/* {part.completedBy && (
                                    <Avatar className="" size="sm" name={part.completedBy.username} src={part.completedBy.image} />
                                )} */}
                  {part.completed && part.completedBy && (
                    <Avatar size="xs" name={part.completedBy.username} src={part.completedBy.image} className="ml-2" />
                  )}
                  {/* {part.completed && part.completedBy && (
                                        <Avatar size="xs" name={part.completedBy.username} src={part.completedBy.image} className="ml-2" />
                                    )} */}
                </div>
                <Divider className="mx-4" orientation="vertical" />
                <p>{part.quantity}</p>
                <Divider className="text-black mx-4" orientation="vertical" />
                <p>{part.item}</p>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TentParts;
