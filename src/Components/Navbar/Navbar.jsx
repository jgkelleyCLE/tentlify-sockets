import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlexRow } from '../UI';
import { logout } from '../../redux/Auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Box, useDisclosure } from '@chakra-ui/react';
import CreateLoad from '../Modals/CreateLoad';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaCaretDown } from 'react-icons/fa';
import NavMenu from './NavMenu';
import { GiForklift } from 'react-icons/gi';
import { FaBell } from 'react-icons/fa';
import io from 'socket.io-client';
import { addNotification } from '../../redux/notificationSlice';
import Notifications from './Notifications';

// let endpoint = "http://localhost:3001"
// let socket

const Navbar = ({ socket }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notifications = useSelector((state) => state.notifications.notifications);

  console.log(user);

  //   useEffect(() => {

  //     console.log("SOCKET in NAV: ", socket)
  //     // socket.on('connect', () => {
  //     //     console.log('Connected to socket server');
  //     // });

  //     // socket.on('disconnect', () => {
  //     //     console.log('Disconnected from socket server');
  //     // });

  //     return () => {
  //         socket.off('connect');
  //         socket.off('disconnect');
  //     };
  // }, [socket]);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      socket.off('getNotification');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('getOrderNotification', (data) => {
      dispatch(addNotification(data));
    });

    return () => {
      socket.off('getOrderNotification');
    };
  }, []);

  console.log(notifications);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="bg-gray-950/90 h-16 flex items-center justify-between p-2 z-20 fixed top-0 w-full">
      <Link to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FTenlify_Logo_Thin_Small.png?alt=media&token=977d961e-7d08-4031-b2d1-52cfa3d2cada"
          alt="tentlify_logo"
          className=" h-24"
        />
      </Link>

      <div>
        {user ? (
          <FlexRow className="gap-2">
            <Notifications className="mr-2" />

            <NavMenu />
          </FlexRow>
        ) : null}
      </div>
      <CreateLoad isOpen={isOpen} onClose={onClose} socket={socket} />
    </div>
  );
};

export default Navbar;
