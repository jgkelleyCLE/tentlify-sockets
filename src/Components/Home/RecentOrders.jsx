import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../redux/ordersApi';
import { CalcBox } from '../Calculator/Calulator.styles';
import { FlexColumn, FlexRow } from '../UI';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCreateLoadFromOrderMutation, useGetLoadsQuery, useUpdateLoadMutation } from '../../redux/loadApi';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../../redux/userApi';
import TentBadge from '../Modals/TentBadge';

const RecentOrders = ({ socket }) => {
  const { data: allUsers } = useGetUsersQuery();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const [createdLoads, setCreatedLoads] = useState([]);
  const [processedOrders, setProcessedOrders] = useState([]);
  const userKey = `createdLoadIds_${user.id}`;
  const [createdLoadIds, setCreatedLoadIds] = useState(() => {
    const saved = localStorage.getItem(userKey);
    return saved ? JSON.parse(saved) : [];
  });
  const { data: orders, isSuccess: ordersSuccess, isLoading, isError, error, refetch } = useGetOrdersQuery();
  const [createLoadFromOrder] = useCreateLoadFromOrderMutation();

  useEffect(() => {
    if (ordersSuccess && orders) {
      const newOrders = orders.filter((order) => !createdLoadIds.includes(order._id));
      setProcessedOrders(newOrders);
    }
  }, [ordersSuccess, orders, createdLoadIds]);

  useEffect(() => {
    const createLoads = async () => {
      const newLoads = await Promise.all(
        processedOrders.map(async (order) => {
          try {
            // Check on the server side if a load has already been created for this order
            const response = await createLoadFromOrder({ order }).unwrap();
            if (response && response._id) {
              setCreatedLoadIds((prevIds) => {
                const updatedIds = [...prevIds, order._id];
                localStorage.setItem(userKey, JSON.stringify(updatedIds));
                return updatedIds;
              });
              handleNotification({ loadId: response._id, title: response.title });

              return response;
            }
            return null;
          } catch (error) {
            console.error('Error creating load from order: ', error);
            // toast({
            //     title: "Error creating load",
            //     description: error.message,
            //     status: 'error',
            //     duration: 2000,
            //     isClosable: true,
            // });
            return null;
          }
        })
      );
      setCreatedLoads(newLoads.filter((load) => load !== null));
    };

    if (processedOrders.length > 0) {
      createLoads();
    }
  }, [processedOrders, createLoadFromOrder, toast, userKey]);

  // Polling mechanism to fetch new orders every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000); // 5 seconds

    return () => clearInterval(intervalId);
  }, [refetch]);

  const { data: loads } = useGetLoadsQuery();

  const handleNotification = ({ loadId, title }) => {
    // console.log("SENDING NOTIFICATION")

    // console.log("SELECTED USERS to be passed in to NOTIFICATION -----------******---------: ", allUsers)

    socket.emit('orderNotification', {
      senderName: user,
      receiverNames: allUsers,
      loadId,
      title,
      type: 2,
    });
  };

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (ordersSuccess) {
    content = loads?.slice(0, 4).map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-md p-2 my-1 w-full cursor-pointer"
        onClick={() => navigate(`/load/${item._id}`)}
      >
        <h1 className="text-xl font-bold">{item.title}</h1>
        <FlexRow className="line-clamp-1">
          {item.tents.slice(0, 3).map((tent) => (
            <div key={tent._id} className="bg-purple-100 m-1 line-clamp-1 rounded-md p-1">
              <h1 className="text-xs">
                {tent.product}
                {tent.category === 'Chairs' || tent.category === 'Tables' ? 's' : null}
              </h1>
            </div>
          ))}
          {item.tents.length - 3 > 1 ? (
            <h1 className="text-xs text-gray-400 italic ml-1">+{item.tents.length - 3} more</h1>
          ) : null}
        </FlexRow>
        <h1 className="text-sm text-gray-400">Event: {new Date(item.eventDate).toDateString()}</h1>
        <h1 className="text-sm text-gray-400">Created: {new Date(item.createdAt).toDateString()}</h1>
      </div>
    ));
  }

  return (
    <CalcBox>
      <FlexRow>
        <h1 className="text-xl">Recent Orders </h1>
      </FlexRow>
      {loads?.length === 0 ? <h1 className="text-lg my-2 italic text-gray-400">No recent orders</h1> : null}
      {content}
      {loads?.length > 0 ? (
        <Button
          colorScheme="blue"
          variant="solid"
          w="100%"
          onClick={() => navigate('/orders')}
          className="text-sm text-gray-400 mt-2 cursor-pointer "
        >
          View All
        </Button>
      ) : null}
    </CalcBox>
  );
};

export default RecentOrders;
