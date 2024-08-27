import React, { useState, useEffect } from 'react'
import { useGetUsersQuery } from '../../redux/userApi'
import { FlexColumn, FlexRow } from '../UI'
import { Avatar, Button, Spinner } from '@chakra-ui/react'
import { useAddUserToLoadMutation, useRemoveUserFromLoadMutation } from '../../redux/loadApi'
import UserBadge from './UserBadge'
import { MdGroups2 } from "react-icons/md";
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const UserList = ({ loadId, selectedUsers, setSelectedUsers }) => {

    const loggedInUserId = useSelector(state => state.auth.user._id)
    console.log("SELECTED USERS: ", selectedUsers)

    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()

    console.log(users)

    let content;

    const [addUserToLoad, { data: addData, isSuccess: addSuccess, isLoading: addLoading, isError: addError }] = useAddUserToLoadMutation()

    const [removeUserFromLoad, { data: removeData, isSuccess: removeSuccess }] = useRemoveUserFromLoadMutation()

    let isUserInLoad
    
    const handleToggle = (item) => {
        console.log(item);
        isUserInLoad = users.some(user => user._id === item._id && user.inLoad);

        // addUserToLoad({ id: loadId, userId: item._id });

        setSelectedUsers([...selectedUsers, item])
    
        // if (isUserInLoad) {
        //   await removeUserFromLoad({ id: item._id });
        // } else {
        //   await addUserToLoad({ id: loadId, userId: item._id });
        // }
      };

    

    if (isLoading) {
        content = <FlexColumn><Spinner /></FlexColumn>;
      } else if (isSuccess) {
        content = users.filter(user => user._id !== loggedInUserId).map(item => (
          <FlexRow
            key={item._id}
            className={`bg-gray-100 justify-between p-1 rounded-lg my-2 hover:bg-gray-300 transition duration-300 ${selectedUsers.includes(item) ? 'bg-green-100 border-2 border-green-300 hover:bg-green-300 transition duration-300' : ''}`}
            
          >
            <FlexRow>
            <Avatar size="sm" src={item.image} name={item.username} className="mr-2" />
            <h1>{item.username}</h1>
            </FlexRow>
            <Button isDisabled={selectedUsers.some(user => user._id === item._id)} colorScheme="green" onClick={() => handleToggle(item)}>{selectedUsers.some(user => user._id === item._id) ? <FlexRow><FaCheck className="mr-2" /><h1>Added</h1></FlexRow> : <FlexRow><MdGroups2 className="mr-2 text-xl" /><h1>Add to group</h1></FlexRow> }</Button>
          </FlexRow>
        ));
      }

      

      const handleDeleteUser = (user) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== user._id))
      }

  return (
    <div>
        {content}
        
        {/* <div className="flex flex-wrap">
        {selectedUsers.map(item => (
            <UserBadge key={item._id} item={item} handleFunction={ ()=> handleDeleteUser(item) } />
        ))}
        </div> */}
    </div>
  )
}

export default UserList