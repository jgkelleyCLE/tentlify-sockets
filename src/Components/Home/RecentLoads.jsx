import React, { useEffect, useState } from 'react';
import { CalcBox } from '../Calculator/Calulator.styles';
import { useGetLoadByUserQuery } from '../../redux/loadApi';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge, Button, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FlexRow } from '../UI';
import TentBadge from '../Modals/TentBadge';
import { setLoadCreated } from '../../redux/loadSlice';
import axios from 'axios';

const RecentLoads = () => {
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const loadCreated = useSelector((state) => state.load.loadCreated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: loads, isSuccess, isLoading, isError, error, refetch } = useGetLoadByUserQuery(user?._id);

  const [userLoads, setUserLoads] = useState(loads);

  console.log('LOADS: ', loads);

  console.log('LOAD CREATED STATE OUTSIDE: ', loadCreated);

  useEffect(() => {
    console.log('LOAD CREATED STATE INSIDE: ', loadCreated);

    if (loadCreated) {
      refetch(); // Refetch the data from the server
      dispatch(setLoadCreated(false)); // Reset the loadCreated state
    }
  }, [loadCreated, refetch, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setUserLoads(loads);
    }
  }, [isSuccess, loads]);

  console.log('USER LOADS from AXIOS---------------: ', userLoads);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = userLoads?.slice(0, 4).map((item) => (
      <div
        key={item._id}
        className="flex flex-col items-start   bg-white p-2 rounded-md cursor-pointer my-1 hover:shadow-md transition duration-300 w-full relative"
        onClick={() => navigate(`/load/${item._id}`)}
      >
        {item.active == false ? (
          <h1 className="text-red-500/20 text-5xl absolute inset-0 flex items-center justify-center">INACTIVE</h1>
        ) : null}

        <h1 className="text-lg font-semibold">{item.title}</h1>
        <FlexRow>
          {/* {item?.tents?.map(tent => (
                    <div className="line-clamp-1 bg-purple-100 flex items-center rounded-md p-1 m-1" key={tent._id} alt={tent.product}><h1 className="text-xs">{tent?.product}</h1></div>
                ))} */}
          {/* <h1 className="text-xs text-gray-400 italic">Created by:</h1> */}
          <Avatar size="xs" src={item.groupAdmin.image} name={item.groupAdmin.username} />
          <h1 className="text-sm ml-1">{item.groupAdmin.username}</h1>
        </FlexRow>
        <h1 className="text-sm text-gray-400">{new Date(item.createdAt).toDateString()}</h1>
      </div>
    ));
  }

  return (
    <CalcBox>
      <h1 className="text-xl">Recent Loads</h1>
      {/* <button className="bg-pink-500" onClick={()=> refetch()}>Refetch</button> */}
      {loads?.length < 1 ? <h1 className="text-lg text-gray-400 italic my-4">No loads yet</h1> : content}
      <Button colorScheme="blue" w="100%" onClick={() => navigate('/loads')}>
        View All
      </Button>
    </CalcBox>
  );
};

export default RecentLoads;
