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
  useToast,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useGetMutatedTentQuery, useUpdateMutatedTentMutation } from '../../redux/mutatedApi';
import { useGetUserQuery } from '../../redux/userApi';
import { FaImages } from 'react-icons/fa';
import { FlexRow } from '../UI';
import ProductModal from '../Modals/ProductModal';
import { GoGear } from 'react-icons/go';

let endpoint = 'https://tentlify-checklist.up.railway.app';
let socket;

const NoSocketsAccordion = ({ item, load }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loggedInUser = useSelector((state) => state.auth.user);
  const { data: user } = useGetUserQuery(loggedInUser._id);

  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const [percent, setPercent] = useState(0);
  const [parts, setParts] = useState(item.parts);
  const [completingPartId, setCompletingPartId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [
    updateMutatedTent,
    { data: updateData, isLoading, isSuccess, isError, error },
  ] = useUpdateMutatedTentMutation();

  const {
    data: tent,
    isSuccess: getSuccess,
    isError: isGetError,
    isLoading: getLoading,
    error: getError,
    refetch,
  } = useGetMutatedTentQuery(item?._id);

  // Initialize accordion state from localStorage
  const initialAccordionState = JSON.parse(localStorage.getItem('accordionState')) || {};
  const [accordionState, setAccordionState] = useState(initialAccordionState);

  const [disabledMode, setDisabledMode] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    socket = io(endpoint);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for the itemToggled event coming from the server
    socket.on('itemToggled', ({ part, user }) => {
      console.log('Received itemToggled event: ', part, user);
      setParts((prevParts) => {
        const updatedParts = prevParts.map((p) => (p._id === part._id ? part : p));
        // console.log("Updated parts: ", updatedParts);
        return updatedParts;
      });
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  // Update localStorage whenever accordionState changes
  useEffect(() => {
    localStorage.setItem('accordionState', JSON.stringify(accordionState));
  }, [accordionState]);

  const handleAccordionToggle = (index) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleCompletePart = async (part) => {
    const updatedPart = { ...part, completed: !part.completed, completedBy: !part.completed ? user : null };

    // Save the updated part to the database
    try {
      setCompletingPartId(part._id);
      await updateMutatedTent({ id: item._id, partId: updatedPart._id, updatedPart }).unwrap();

      // Update the state only after the database update is successful
      setParts((prevParts) => {
        const updatedParts = prevParts.map((p) => (p._id === updatedPart._id ? updatedPart : p));
        return updatedParts;
      });
      setCompletingPartId(null);
      // send socket event to server
      socket.emit('toggleItemComplete', { part: updatedPart, user });

      console.log('Refetching data...');
      await refetch();
      console.log('Data refetched successfully');
    } catch (err) {
      console.error('Failed to update part: ', err);
      setCompletingPartId(null);
      if (isError) {
        toast({
          title: 'Error',
          description: 'Failed to update the part.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    const completedCount = parts.filter((part) => part.completed).length;
    setLoaded(completedCount);
    setPercent((completedCount / parts.length) * 100);
  }, [parts]);

  const allLoaded = loaded === item.parts.length;

  useEffect(() => {
    // Set disabled state based on item.active
    setDisabledMode(!item.active);
  }, [item.active]);

  const handleImageIconClick = (event, item) => {
    event.stopPropagation();
    // Handle the image icon click here
    console.log(`${item.product} image icon clicked`);

    setSelectedProduct(item);
    onOpen();
  };

  return (
    <div className="w-full">
      {/* ACCORDION BUTTONS */}
      <Accordion allowMultiple className="w-full relative">
        <AccordionItem className="w-full my-1 rounded-md">
          <h2 className="w-full">
            <AccordionButton
              className={`w-full relative overflow-hidden ${
                allLoaded ? 'bg-green-200 hover:bg-green-300 rounded-md' : 'bg-gray-100 rounded-md '
              }`}
            >
              <Box as="span" flex="1" textAlign="left" className="relative z-10">
                <FlexRow className="gap-1.5 relative">
                  <span className="font-bold">{load.loadType == 2 ? item.cartQuantity : null}</span>{' '}
                  <span>{load.loadType == 2 ? '-' : null}</span>
                  {item.product}
                  {item.category === 'Chairs' ||
                  item.category === 'Tables' ||
                  (item.category === 'Stage' && item.cartQuantity > 1)
                    ? 's'
                    : null}{' '}
                  <span className="hidden md:inline">
                    {' '}
                    - {loaded} / {item.parts.length}
                  </span>{' '}
                  - {((loaded / item.parts.length) * 100).toFixed(0)}% -
                  <button
                    className=" z-40 hover:bg-white transition duration-300 p-1 rounded-md flex items-center"
                    onClick={(event) => handleImageIconClick(event, item)}
                  >
                    {item.category === 'Tents' || item.category === 'Stage' ? <GoGear /> : <FaImages />}
                    <h1 className="ml-1 hidden md:inline">View</h1>
                  </button>
                </FlexRow>
              </Box>
              <AccordionIcon />
              <Box className="absolute top-0 left-0 h-full bg-green-200" style={{ width: `${percent}%` }} />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="w-full">
            {/* PARTS WITHIN ACCORDION BUTTON */}
            {parts.map((part) => (
              <button
                key={part._id}
                className={` ${
                  part.completed ? 'bg-green-100 border-green-300' : 'bg-gray-100'
                } flex items-center justify-start p-1 md:p-2 bg-gray-100 rounded-md my-1 cursor-pointer border-2 border-gray-300 relative mx-auto w-11/12 ${
                  part?.completedBy?._id == null || user._id === part.completedBy._id
                    ? 'cursor-pointer'
                    : user._id !== part.completedBy?._id
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                disabled={
                  load?.active == false || part?.completedBy?._id == null || user._id === part.completedBy._id
                    ? false
                    : user._id !== part.completedBy?._id
                    ? true
                    : false
                }
                onClick={() => handleCompletePart(part)}
              >
                <div className="">
                  {completingPartId === part._id ? (
                    <Spinner thickness="3px" className="absolute top-2 left-3 z-40" />
                  ) : null}
                  {part.completed && part.completedBy && (
                    // <Avatar size="xs" name={part?.completedBy.username} src={part?.completedBy.image} className="ml-2" />
                    <div className="ml-2 xs:w-8 xs:h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14">
                      <Tooltip label={part.completedBy.username}>
                        <Avatar
                          size="xs"
                          name={part?.completedBy.username}
                          src={part?.completedBy.image}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Tooltip>
                    </div>
                  )}
                </div>
                <Divider className="mx-4" orientation="vertical" />

                {/* //calculates the quantity on checklist based on how many Tents or stages were in the order (cartQuantity * part.quantity) -- tables and chairs don't make this calculation */}
                <p>
                  {item.category === 'Chairs' || item.category === 'Tables'
                    ? item.cartQuantity
                    : item.category === 'Tents' && item.cartQuantity > 1
                    ? item.cartQuantity * part.quantity
                    : item.category === 'Stage' && item.cartQuantity > 1
                    ? item.cartQuantity * part.quantity
                    : part.quantity}
                </p>
                <Divider className="text-black mx-4" orientation="vertical" />
                <p>
                  {part.item}
                  {item.category === 'Chairs' || (item.category === 'Tables' && item.cartQuantity > 1) ? 's' : null}
                </p>
                {(item.cartQuantity > 1 && item.category === 'Tents') ||
                (item.category === 'Stage' && item.cartQuantity > 1) ? (
                  <p className="font-semibold ml-2">(x{item.cartQuantity})</p>
                ) : null}
              </button>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />
    </div>
  );
};

export default NoSocketsAccordion;
