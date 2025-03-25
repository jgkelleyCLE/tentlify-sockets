import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
  Stepper,
} from '@chakra-ui/react';
import LoadAccordion from './LoadAccordion';
import {
  useCreateLoadMutation,
  useGetLoadQuery,
  useUpdateLoadMutation,
  useDeleteLoadMutation,
} from '../../redux/loadApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadStepper from '../LoadStepper/LoadStepper';
import { setLoadCreated } from '../../redux/loadSlice';

const CreateLoad = ({ isOpen, onOpen, onClose, socket }) => {
  const dispatch = useDispatch();
  const loadCreated = useSelector((state) => state.load.loadCreated);

  const [loadId, setLoadId] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTents, setSelectedTents] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();

  const [createLoad, { data: createData, isSuccess, isLoading, isError, error }] = useCreateLoadMutation();

  const [
    updateLoad,
    { data: updateData, isSuccess: updateSuccess, isLoading: updateLoading, isError: updateError },
  ] = useUpdateLoadMutation();

  const [
    deleteLoad,
    { data: deleteData, isSuccess: deleteSuccess, isLoading: deleteLoading, isError: deleteError },
  ] = useDeleteLoadMutation();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isOpen && !loadId) {
      createLoad({ groupAdmin: user?._id });

      dispatch(setLoadCreated(true));
      console.log('LOAD CREATED: ', loadCreated);
    }
  }, [isOpen, loadId, createLoad, user?._id]);

  useEffect(() => {
    if (isSuccess && createData && !loadId) {
      setLoadId(createData._id);
    }
  }, [isSuccess, createData, loadId]);

  // const { data: loadData } = useGetLoadQuery(loadId)

  const handleNotification = ({ loadId, title }) => {
    console.log('SENDING NOTIFICATION');

    console.log('SELECTED USERS to be passed in to NOTIFICATION -----------******---------: ', selectedUsers);

    socket.emit('sendNotification', {
      senderName: user,
      receiverNames: selectedUsers,
      loadId,
      title,
      type: 1,
    });
  };

  const updateHandler = () => {
    console.log('UPDATE HANDLER CALLED _______*********');

    if (title === '') {
      toast({
        title: 'Please enter a title',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    } else if (selectedUsers.length === 0) {
      toast({
        title: 'Please select users',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    } else if (selectedTents.length === 0) {
      toast({
        title: 'Please select tents',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    } else {
      handleNotification({ loadId, title });
      updateLoad({ id: loadId, title, users: selectedUsers, tents: selectedTents });
      dispatch(setLoadCreated(true));
      console.log('LOAD CREATED: ', loadCreated);
      onClose();
      setTitle('');
      setSelectedUsers([]);
      setSelectedTents([]);
      navigate(`/load/${loadId}`);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: 'Load Created',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      console.log('SUCCESS');

      onClose();
    }
  }, [updateSuccess]);

  const closeHandler = async () => {
    console.log('Deleting load....', loadId);
    await deleteLoad({ id: loadId });
    onClose();
    setTitle('');
    setSelectedUsers([]);
    setSelectedTents([]);
  };

  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        className="w-[95%]"
        size="2xl"
        w="95%"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Collaborative Load</ModalHeader>
          <ModalCloseButton onClick={closeHandler} />
          <ModalBody>
            <Input
              placeholder="Enter Load Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="my-2"
            />
            <LoadAccordion
              loadId={loadId}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              selectedTents={selectedTents}
              setSelectedTents={setSelectedTents}
            />

            {/* <LoadStepper loadId={loadId} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} selectedTents={selectedTents} setSelectedTents={setSelectedTents} /> */}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => closeHandler()}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={updateHandler}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLoad;
