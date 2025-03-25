import React, { useEffect } from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, CloseButton, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FlexColumn } from '../UI';
import { useGetUserQuery } from '../../redux/userApi';

const WelcomeAlert = () => {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure();

  const loggedUser = useSelector((state) => state.auth.user);

  const { data: user } = useGetUserQuery(loggedUser?._id);

  useEffect(() => {
    const savedVisibility = localStorage.getItem('welcomeAlertVisible');
    if (savedVisibility === 'false') {
      onClose();
    } else {
      onOpen();
    }
  }, [onClose, onOpen]);

  // Update localStorage when visibility state changes
  useEffect(() => {
    localStorage.setItem('welcomeAlertVisible', isVisible);
  }, [isVisible]);

  return isVisible ? (
    <Alert status="info" className="w-11/12" borderRadius="md" maxW={'500px'} w={'91.66%'} p={4}>
      <AlertIcon />
      <FlexColumn>
        <AlertTitle fontSize={'lg'}>Welcome to Tentlify, {user?.username}!</AlertTitle>
        <AlertDescription fontSize={'lg'}>
          <Link className="underline" to={`/profile/${user?._id}`}>
            View Profile
          </Link>{' '}
          to change your username and avatar
        </AlertDescription>
      </FlexColumn>
      <CloseButton alignSelf="flex-start" position="relative" right={-1} top={-1} onClick={onClose} />
    </Alert>
  ) : null;
};

export default WelcomeAlert;
