import React from 'react';
import { useFetchTentsQuery, useGetTentsQuery } from '../../redux/tentApi';
import { MobileCard, CardImage, CardDetails, CardTitle } from './TentList.styles';
import { useNavigate } from 'react-router-dom';
import { FlexColumn } from '../UI';
import { Spinner } from '@chakra-ui/react';

const Tents = ({ search, setSearch }) => {
  // const { data: tents, isSuccess, isLoading, isError, error } = useGetTentsQuery()
  const { data: tents, isSuccess, isLoading, isError, error } = useFetchTentsQuery();

  const navigate = useNavigate();

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner size="xl" />
      </FlexColumn>
    );
  } else if (isSuccess) {
    const filteredTents = tents.filter((item) => {
      if (search === '') {
        return item;
      } else if (
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });

    content = (
      <FlexColumn>
        {filteredTents.map((item) => (
          <MobileCard
            className="cursor-pointer w-full max-w-[500px]"
            key={item._id}
            onClick={() => navigate(`/tent/${item._id}`)}
          >
            <CardImage className="hover:opacity-85 w-[50%] h-32 object-cover" src={item.image} alt={item.product} />
            <CardDetails>
              <CardTitle className="text-xl font-semibold">{item.product}</CardTitle>
            </CardDetails>
          </MobileCard>
        ))}
      </FlexColumn>
    );
  }

  return <div className="">{content}</div>;
};

export default Tents;
