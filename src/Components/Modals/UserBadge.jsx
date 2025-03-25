import React from 'react';
import { FlexRow } from '../UI';
import { Avatar } from '@chakra-ui/react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useGetUserQuery } from '../../redux/userApi';

const UserBadge = ({ item, handleFunction }) => {
  const user = useSelector((state) => state.auth.user);

  const { data: userData } = useGetUserQuery(user?._id);

  return (
    <div className="bg-purple-100 flex items-center rounded-md p-1 m-1">
      <Avatar size="sm" src={item.image} name={item.username} className="mr-2" />
      <h1>{item.username}</h1>
      {userData?._id === item?._id ? (
        <FaStar className="text-xl text-yellow-500 ml-2" />
      ) : (
        <IoMdRemoveCircleOutline
          onClick={handleFunction}
          className="text-gray-400 text-xl ml-2 hover:text-black cursor-pointer transition duration-300"
        />
      )}
    </div>
  );
};

export default UserBadge;
