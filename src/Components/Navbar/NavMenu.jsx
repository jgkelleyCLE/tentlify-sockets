import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import { logout } from '../../redux/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { LuMapPin } from 'react-icons/lu';
import { GiCargoCrane } from 'react-icons/gi';
import { useGetUserQuery } from '../../redux/userApi';
import { BsCartCheck } from 'react-icons/bs';

const NavMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData } = useGetUserQuery(user?._id);

  const logoutHandler = () => {
    dispatch(logout());

    navigate('/auth');
  };

  return (
    <Menu className="bg-blue-500">
      <MenuButton
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        as={Button}
        rightIcon={<FaCaretDown className="text-white" />}
      >
        <Avatar size="md" name={userData?.username} src={userData?.image} className="border-2 border-white" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>
          <FaRegUser className="mr-3 text-xl" />
          Profile
        </MenuItem>
        {/* <MenuItem onClick={()=> navigate(`/loads`)}><GiCargoCrane className="mr-3 text-xl" />Group Loads</MenuItem> */}
        <MenuItem onClick={() => navigate(`/orders`)}>
          <BsCartCheck className="mr-3 text-xl" />
          Orders
        </MenuItem>
        <MenuItem onClick={() => navigate(`/map`)}>
          <LuMapPin className="mr-3 text-xl" />
          Map
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={logoutHandler}>
          <MdLogout className="mr-3 text-xl" />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
