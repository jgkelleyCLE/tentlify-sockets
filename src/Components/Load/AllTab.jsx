import React, { useState } from 'react';
import { useGetLoadsQuery } from '../../redux/loadApi';
import { FlexRow, FlexColumn } from '../UI';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup, Spinner, Input } from '@chakra-ui/react';
import TentBadge from '../Modals/TentBadge';

const AllTab = () => {
  const [search, setSearch] = useState('');
  const { data: loads, isLoading, isSuccess, isError, error } = useGetLoadsQuery();
  console.log(loads);
  const navigate = useNavigate();

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    const filteredLoads = loads?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.tents.some((tent) => tent.product.toLowerCase().includes(search.toLowerCase())) ||
        item.tents.some((tent) => tent.tags.toLowerCase().includes(search.toLowerCase()))
    );

    content = filteredLoads.map((item) => (
      <div
        className={`${
          item.active ? 'bg-white' : 'bg-gray-100 border-red-400'
        } flex flex-col items-start border-2 border-gray-400 p-2 rounded-md cursor-pointer my-2 relative`}
        onClick={() => navigate(`/load/${item._id}`)}
        key={item._id}
      >
        <FlexRow>
          <h1 className="text-xl font-semibold">{item.title}</h1>
          <h1 className="text-red-500/20 text-5xl absolute inset-0 flex items-center justify-center">
            {item.active == false ? 'INACTIVE' : null}
          </h1>
          <h1 className="text-sm text-gray-400 ml-2">{new Date(item.createdAt).toDateString()}</h1>
        </FlexRow>

        {/* <AvatarGroup size="sm" max={3} className="gap-1.5">
                {item.users.map(user => (
                    <Avatar size="sm" key={user._id} name={user.username} src={user.image} />
                ))}
                </AvatarGroup> */}
        <FlexRow className="flex-wrap">
          {/* <h1 className="text-sm">Tents: {item.tents.length}</h1> */}
          {item.tents.slice(0, 3).map((item) => (
            //   <TentBadge key={item._id} item={item} />
            <div key={item._id} className="bg-purple-100 m-1 line-clamp-1 rounded-md p-1">
              {/* <Tooltip key={item._id} label={<img src={item.image} alt={item.product} />} aria-label="A tooltip"> */}
              <h1 className="text-xs">{item.product}</h1>
              {/* </Tooltip> */}
            </div>
          ))}
          {item?.tents?.length >= 4 ? (
            <h1 className="text-gray-400 italic text-xs">+{item?.tents?.length - 3} more</h1>
          ) : null}
        </FlexRow>
        <FlexRow>
          <FlexRow className="gap-2 ">
            <Avatar size="xs" src={item?.groupAdmin?.image} name={item?.groupAdmin?.username} />{' '}
            {item?.groupAdmin?.username == null ? (
              <p className="italic text-gray-400">Deleted User</p>
            ) : (
              <p>{item?.groupAdmin?.username}</p>
            )}
          </FlexRow>
        </FlexRow>
      </div>
    ));
  }

  return (
    <div>
      {loads?.length === 0 ? null : (
        <Input
          className="w-[50%] mx-auto"
          placeholder="Filter by title or tents"
          mb={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {loads?.length === 0 && <h1 className="text-xl text-center">No loads have been created</h1>}
      {content}
    </div>
  );
};

export default AllTab;
