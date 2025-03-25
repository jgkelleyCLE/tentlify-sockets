import React from 'react';
import { useGetLoadsQuery } from '../redux/loadApi';
import { FlexColumn, FlexRow, PageContainer } from '../Components/UI';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LoadTabs from '../Components/Load/LoadTabs';

const Loads = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FlexColumn>
        <LoadTabs />
      </FlexColumn>
    </PageContainer>
  );
};

export default Loads;
