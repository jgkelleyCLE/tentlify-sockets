import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useUpdateLoadMutation } from '../../redux/loadApi';
import { useSelector } from 'react-redux';
import LoadAccordion from './LoadAccordion';

const EditLoad = ({ isOpen, onOpen, onClose, load }) => {
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState(load?.title);
  const [selectedTents, setSelectedTents] = useState(load?.tents);
  const [selectedUsers, setSelectedUsers] = useState(load?.users);
  const [loadId, setLoadId] = useState(load?._id);
  const [tentIds, setTentIds] = useState([]);
  const [newTents, setNewTents] = useState([]);

  const toast = useToast();

  const [
    updateLoad,
    { data: updateData, isSuccess: updateSuccess, isLoading: updateLoading, isError: updateError },
  ] = useUpdateLoadMutation();

  useEffect(() => {
    handleSave();
  }, []);

  const handleSave = async () => {
    try {
      const updatedLoad = await updateLoad({ id: load?._id, title, users: selectedUsers, tents: selectedTents });

      console.log('UPDATED LOAD--------------: ', updatedLoad);
      setNewTents(updatedLoad.tents); // Update state with newly created tents
      onClose(updatedLoad); // Pass the updated load back to the parent component
    } catch (error) {
      console.error('Failed to update load:', error);
    }
  };

  useEffect(() => {
    setSelectedTents(load?.tents);

    setSelectedUsers(load?.users);
    setTitle(load?.title);
    setLoadId(load?._id);
  }, [load]);

  useEffect(() => {
    setTentIds(selectedTents?.map((tent) => tent._id));
  }, [load, selectedTents]);

  const updateHandler = () => {
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
      updateLoad({ id: loadId, title, users: selectedUsers, tents: tentIds });
      // updateLoad({ id: loadId, title, users: selectedUsers, tents: selectedTents });

      // onClose()
      setTitle('');
      setSelectedUsers([]);
      setSelectedTents([]);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: 'Load successfully updated',
        status: 'success',
      });
      onClose();
    }

    // if(updateError){
    //     toast({
    //         title: "Error updating loadddddd",
    //         status: 'error'
    //     })
    // }
  }, [updateSuccess, updateError]);

  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {load?.title}</ModalHeader>
          <ModalCloseButton />
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
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={updateHandler}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditLoad;
