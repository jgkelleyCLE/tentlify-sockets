import React, { useState } from 'react';
import { FlexColumn, PageContainer, FlexRow } from '../Components/UI';
import { Input, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGetLoadsQuery } from '../redux/loadApi';

const Orders = () => {
  const [search, setSearch] = useState('');

  const { data: loads, isLoading, isSuccess, isError, error } = useGetLoadsQuery();
  const navigate = useNavigate();

  console.log('ORDERS: ', loads);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner size="xl" />
      </FlexColumn>
    );
  } else if (isSuccess) {
    const filteredLoads = loads?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.tents.some((tent) => tent.product.toLowerCase().includes(search.toLowerCase())) ||
        item.tents.some((tent) => tent.tags.toLowerCase().includes(search.toLowerCase()))
    );

    content = filteredLoads?.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-md p-2 my-1 w-11/12 cursor-pointer border-2 border-gray-300 mx-2"
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
    <PageContainer>
      <FlexColumn>
        <h1 className="text-2xl">Orders ({loads?.length})</h1>
        <Input
          w="92%"
          maxW="400px"
          className="my-2"
          placeholder="Search by title or equipment to filter orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loads?.length < 1 ? (
          <h1 className="mt-10 text-xl text-gray-400 italic">No orders have been created yet!</h1>
        ) : null}
        {content}
      </FlexColumn>
    </PageContainer>
  );
};

export default Orders;
