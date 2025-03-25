import React, { useState } from 'react';
import { useFetchTentsQuery, useGetTentsQuery } from '../redux/tentApi';
import { FlexColumn, PageContainer } from '../Components/UI';
import { Input, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tents from '../Components/Home/Tents';
import Calculator from '../Components/Calculator/Calculator';
import { SearchInput } from '../Components/Calculator/Calulator.styles';
import Favorites from '../Components/Favorites/Favorites';
import WelcomeAlert from '../Components/Welcome/WelcomeAlert';
import RecentLoads from '../Components/Home/RecentLoads';
import RecentOrders from '../Components/Home/RecentOrders';

const Home = ({ socket }) => {
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCreatedAt = new Date(user.createdAt);
  const today = new Date();

  const isSameDate =
    userCreatedAt.getFullYear() === today.getFullYear() &&
    userCreatedAt.getMonth() === today.getMonth() &&
    userCreatedAt.getDate() === today.getDate();

  return (
    <PageContainer>
      <FlexColumn>
        <SearchInput
          className="max-w-[500px] text-2xl"
          placeholder="Search tent dimensions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* {isSameDate ? <WelcomeAlert /> : null} */}
        <WelcomeAlert />

        {search.length > 0 ? <Tents search={search} setSearch={setSearch} /> : null}

        <Calculator />
        {/* <RecentLoads /> */}
        <RecentOrders socket={socket} />
        <Favorites />
      </FlexColumn>
    </PageContainer>
  );
};

export default Home;
