import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FlexColumn, PageContainer } from '../Components/UI';
import { Avatar, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import EditModal from '../Components/Modals/EditModal';
import { useGetUserQuery } from '../redux/userApi';

const Profile = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: userInfo, refetch } = useGetUserQuery(id);

  console.log('user', userInfo);

  return (
    <PageContainer>
      <FlexColumn className="mt-28">
        <Avatar
          src={userInfo?.image}
          name={userInfo?.username}
          size="xl"
          alt="user avatar"
          className="rounded-full w-40 h-40"
        />
        {/* <img src= /> */}
        <h1 className="text-2xl my-2">{userInfo?.username}</h1>
        <Button onClick={onOpen} colorScheme="blue">
          Edit Profile
        </Button>
      </FlexColumn>
      <EditModal isOpen={isOpen} onClose={onClose} userInfo={userInfo} refetch={refetch} />
    </PageContainer>
  );
};

export default Profile;
