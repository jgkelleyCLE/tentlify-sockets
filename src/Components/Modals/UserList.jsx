import React, { useState, useEffect } from 'react';
import { useGetUserQuery, useGetUsersQuery } from '../../redux/userApi';
import { FlexColumn, FlexRow } from '../UI';
import { Avatar, Button, Spinner } from '@chakra-ui/react';
import { MdGroups2 } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdPersonAddAlt1 } from 'react-icons/md';

const UserList = ({ loadId, selectedUsers, setSelectedUsers }) => {
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const { data: user } = useGetUserQuery(loggedInUserId);

  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  let content;

  let isUserInLoad;

  const handleToggle = (item) => {
    console.log(item);
    isUserInLoad = users.some((user) => user._id === item._id && user.inLoad);

    setSelectedUsers([...selectedUsers, item]);
  };

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = users
      .filter((user) => user._id !== loggedInUserId && user._id !== '66ed7fedf802032033a4337a')
      .map((item) => (
        <FlexRow
          key={item._id}
          className={`bg-gray-100 justify-between p-1 rounded-lg my-2 hover:bg-gray-300 transition duration-300 ${
            selectedUsers.includes(item)
              ? 'bg-green-100 border-2 border-green-300 hover:bg-green-300 transition duration-300'
              : ''
          }`}
        >
          <FlexRow>
            <Avatar size="sm" src={item.image} name={item.username} className="mr-2" />
            <h1>{item.username}</h1>
          </FlexRow>
          <Button
            isDisabled={selectedUsers.some((user) => user._id === item._id)}
            colorScheme="green"
            onClick={() => handleToggle(item)}
          >
            {selectedUsers.some((user) => user._id === item._id) ? (
              <FlexRow>
                <FaCheck className="mr-2" />
                <h1>Added</h1>
              </FlexRow>
            ) : (
              <FlexRow>
                <MdPersonAddAlt1 className="mr-2 text-xl" />
                <h1>Add</h1>
              </FlexRow>
            )}
          </Button>
        </FlexRow>
      ));
  }

  const handleDeleteUser = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  return <div>{content}</div>;
};

export default UserList;
