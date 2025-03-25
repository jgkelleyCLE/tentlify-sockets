import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Badge,
  Button,
  Avatar,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { clearAllNotifications, removeNotification } from '../../redux/notificationSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onClose();
  }, [location]);

  const displayNotification = (item) => {
    if (item.type === 1) {
      return (
        <div
          className="flex flex-col items-start gap-2 bg-gray-200 my-1 rounded-md p-1 cursor-pointer hover:bg-gray-300 transition duration-300"
          onClick={() => navigationHandler(item)}
        >
          <div className="flex items-center gap-2">
            <Avatar size="xs" src={item?.senderName.image} name={item?.senderName.username} />
            <p>
              {item?.senderName.username} invited you to load: <span className="font-bold">{item?.title}</span>{' '}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="w-full flex flex-col items-start  bg-gray-200 my-1 rounded-md p-1 cursor-pointer hover:bg-gray-300 transition duration-300 relative"
          onClick={() => navigationHandler(item)}
        >
          <div className="flex flex-col items-start w-full">
            <p>New order created!</p>
            <p className="font-bold">{item?.title}</p>
          </div>
          <button
            onClick={(event) => {
              event.stopPropagation();
              dispatch(removeNotification(item._id));
            }}
            className="text-xl hover:bg-white transition duration-300 p-1 rounded-md absolute right-1 z-20"
          >
            <IoMdClose />
          </button>
        </div>
      );
    }
  };

  const removeHandler = (item) => {
    dispatch(removeNotification(item._id));
  };

  const navigationHandler = (item) => {
    navigate(`/load/${item.loadId}`);
    // onClose()
  };

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <Popover w="100%" className="max-w-[650px]" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <div className="relative cursor-pointer" onClick={onOpen}>
          <FaBell className="text-xl text-gray-100 hover:text-white transition duration-300" />
          <Badge
            variant="solid"
            colorScheme="red"
            className={`absolute left-3 bottom-3.5 ${notifications.length > 0 ? 'animate-bounce' : 'animate-none'}`}
          >
            {notifications.length}
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-11/12 bg-red-300">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notifications ({notifications.length})</PopoverHeader>
        <PopoverBody>
          <div className="max-h-[200px] overflow-y-scroll w-full">
            {notifications.length < 1 ? <p className="italic text-gray-400">No notifications</p> : null}
            {/* {notifications.map((item, index) => (
            
            <div key={index}>{displayNotification(item)}</div>
        ))} */}
            {notifications
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={index}>{displayNotification(item)}</div>
              ))}
          </div>
        </PopoverBody>

        {notifications.length > 0 ? (
          <PopoverFooter>
            <Button onClick={() => dispatch(clearAllNotifications())} w="100%">
              Mark all as read
            </Button>
          </PopoverFooter>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
