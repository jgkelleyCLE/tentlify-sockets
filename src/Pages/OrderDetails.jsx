import React, { useEffect, useState } from 'react';
import { FlexColumn, PageContainer } from '../Components/UI';
import { useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../redux/ordersApi';
import { Spinner } from '@chakra-ui/react';
import NoSocketsAccordion from '../Components/Load/NoSocketsAccordion';
import { updateLoad } from '../../../server/controllers/Load';
import { useCreateMutatedTentMutation } from '../redux/loadApi';

const OrderDetails = () => {
  const { id } = useParams();

  const [selectedTents, setSelectedTents] = useState([]);
  const [mutatedTents, setMutatedTents] = useState([]);

  const { data: order, isLoading, isSuccess, isError, error } = useGetOrderQuery(id);

  const [createMutatedTent] = useCreateMutatedTentMutation();

  console.log('MUTATED TENTS: ', mutatedTents);

  console.log('SELECTED TENTS: ', selectedTents);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <FlexColumn>
        <h1>Order Id: {order?._id}</h1>
        <h1 className="text-2xl">{order?.title}</h1>
        <h1>Event date: {new Date(order?.eventDate).toDateString()}</h1>
        <h1>Order created: {new Date(order?.createdAt).toDateString()}</h1>
        <div className="w-11/12">
          {selectedTents?.map((item) => (
            // <TentPartAccordion key={item._id} item={item} />
            // <TentParts key={item._id} item={item} />
            <NoSocketsAccordion key={item._id} item={item} load={order} />
          ))}
        </div>
      </FlexColumn>
    );
  }

  // const list = mutatedTents.map((item, index) => {
  //     return <li key={index}>{item}</li>
  // })

  // console.log("mutated tents: ", mutatedTents)

  return (
    <PageContainer>
      {content}

      <h1>Mutated Tents</h1>
      {/* {list} */}
    </PageContainer>
  );
};

export default OrderDetails;
