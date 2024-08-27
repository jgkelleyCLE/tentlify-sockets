import React, {useEffect, useState} from 'react'
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
    useToast
  } from '@chakra-ui/react'
import LoadAccordion from './LoadAccordion'
import { useCreateLoadMutation, useGetLoadQuery, useUpdateLoadMutation, useDeleteLoadMutation } from '../../redux/loadApi'
import { useSelector } from 'react-redux'

const CreateLoad = ({ isOpen, onOpen, onClose }) => {

    const [loadId, setLoadId] = useState(null);
    const [title, setTitle] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedTents, setSelectedTents] = useState([])

    const toast = useToast()

    const [createLoad, { data: createData, isSuccess, isLoading, isError, error }] = useCreateLoadMutation()

    const [updateLoad, {data: updateData, isSuccess: updateSuccess, isLoading: updateLoading, isError: updateError}] = useUpdateLoadMutation()

    const [deleteLoad, {data: deleteData, isSuccess: deleteSuccess, isLoading: deleteLoading, isError: deleteError}] = useDeleteLoadMutation()

    

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (isOpen && !loadId) {
          createLoad({ groupAdmin: user?._id });
        }
      }, [isOpen, loadId, createLoad, user?._id]);
    
      useEffect(() => {
        if (isSuccess && createData && !loadId) {
          setLoadId(createData._id);
        }
      }, [isSuccess, createData, loadId]);

    console.log("Created load ID: ", loadId)
    const { data: loadData } = useGetLoadQuery(loadId)
    console.log("Load Data: ", loadData)

    const updateHandler = () => {

        if(title === ""){
            toast({
                title: "Please enter a title",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            return
        }else if(selectedUsers.length === 0){
            toast({
                title: "Please select users",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            return
        }else if(selectedTents.length === 0){
            toast({
                title: "Please select tents",
                status: 'error',
                duration: 2000,
                isClosable: true
            })
            return
        }else {

            updateLoad({id: loadId, title, users: selectedUsers, tents: selectedTents})
            onClose()
        }

    }

    useEffect(()=> {

        if(updateSuccess){
            toast({
                title: "Load Created",
                status: 'success',
                duration: 2000,
                isClosable: true
            })

            console.log("SUCCESS")

            onClose()
        }

    }, [updateSuccess])

    const closeHandler = async() => {
      console.log("Deleting load....", loadId)
        await deleteLoad({id: loadId})
        onClose()
        setTitle("")
        setSelectedUsers([])
        setSelectedTents([])
        

    }

  return (
    <>
    <Modal isCentered blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} className="w-[95%]" size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Collab</ModalHeader>
          <ModalCloseButton onClick={closeHandler} />
          <ModalBody>
            <h1>Load ID: {loadId}</h1>
            <Input placeholder="Enter Load Name" value={title} onChange={(e)=> setTitle(e.target.value)} className="my-2" />
            <LoadAccordion loadId={loadId} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} selectedTents={selectedTents} setSelectedTents={setSelectedTents} />
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=> closeHandler()}>
              Close
            </Button>
            <Button variant='ghost' onClick={updateHandler}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateLoad