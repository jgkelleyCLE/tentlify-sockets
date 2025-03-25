import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActivateLoadMutation, useDeactivateLoadMutation, useGetLoadQuery } from '../redux/loadApi';
import { FlexColumn, FlexRow, PageContainer } from '../Components/UI';
import { Spinner, AvatarGroup, Avatar, Tooltip, Button, useDisclosure } from '@chakra-ui/react';
import TentPartAccordion from '../Components/Load/TentPartAccordion';
import { FaStar } from 'react-icons/fa';
import TentParts from '../Components/Load/TentParts';
import NoSocketsAccordion from '../Components/Load/NoSocketsAccordion';
import EditLoad from '../Components/Modals/EditLoad';
import { useSelector } from 'react-redux';

let endpoint = 'http://localhost:3001';
let socket;

const LoadDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [fetchedLoad, setFetchedLoad] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: load, isLoading, isSuccess, isError, error } = useGetLoadQuery(id);

  const [
    deactivateLoad,
    { data: deactivateData, isSuccess: deactivateSuccess, isLoading: deactivateLoading, isError: deactivateError },
  ] = useDeactivateLoadMutation();

  const [
    activateLoad,
    { data: activateData, isSuccess: activateSuccess, isLoading: activateLoading, isError: activateError },
  ] = useActivateLoadMutation();

  console.log('LOAD: ', load);

  const isAdmin = user?._id === load?.groupAdmin?._id;

  useEffect(() => {
    if (isSuccess) {
      setFetchedLoad(load);
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <FlexColumn className="gap-2">
        <h1 className="text-3xl">{load?.title}</h1>

        {/* //only show users and group admin if it's a group load */}
        {load?.loadType == 1 ? (
          <FlexRow>
            <div className="relative">
              <Tooltip
                label={load?.groupAdmin?.username == null ? 'Deleted User' : load?.groupAdmin?.username}
                aria-label="A tooltip"
              >
                <Avatar name={load?.groupAdmin?.username} src={load?.groupAdmin?.image} />
              </Tooltip>
              <FaStar className="text-yellow-400 text-xl ml-2 absolute bottom-8 left-5" />
            </div>

            {load?.users?.map((user) => (
              <Tooltip key={user._id} label={user?.username} aria-label="A tooltip">
                <AvatarGroup className="">
                  <Avatar key={user._id} name={user?.username} src={user?.image} />
                </AvatarGroup>
              </Tooltip>
            ))}
          </FlexRow>
        ) : null}

        <FlexColumn>
          <h1 className="text-gray-400 text-sm italic">
            {load?.loadType == 2 ? 'Order' : 'Load'} Id: {load?._id}
          </h1>
          <h1 className="text-gray-400 text-sm italic">Created: {new Date(load?.createdAt).toDateString()}</h1>
          {load?.loadType == 2 ? (
            <h1 className="text-gray-400 text-sm italic">Event Date: {new Date(load?.eventDate).toDateString()}</h1>
          ) : null}
        </FlexColumn>
        <div className="w-11/12">
          {load?.tents?.map((item) => (
            <NoSocketsAccordion key={item._id} item={item} load={load} />
          ))}
        </div>
      </FlexColumn>
    );
  } else if (isError) {
    content = (
      <FlexColumn>
        <h1>{error.message}</h1>
      </FlexColumn>
    );
    console.log(error);
  }

  const deactivateHandler = () => {
    deactivateLoad({ id: load?._id });
  };

  const activateHandler = () => {
    activateLoad({ id: load?._id });
  };

  return (
    <PageContainer>
      <div className="mt-10">{content}</div>
      {/* <EditLoad isOpen={isOpen} onClose={onClose} load={load} /> */}
    </PageContainer>
  );
};

export default LoadDetails;
