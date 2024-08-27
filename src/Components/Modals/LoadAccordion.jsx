import React, { useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react'
  import { useGetUsersQuery } from '../../redux/userApi'
import UserList from './UserList'
import TentList from './TentList'
import TentBadge from './TentBadge'
import UserBadge from './UserBadge'
import { useSelector } from 'react-redux'

const LoadAccordion = ({ loadId, selectedUsers, setSelectedUsers, selectedTents, setSelectedTents }) => {

  const user = useSelector(state => state.auth.user)
    const { data: userData, isLoading, isSuccess, isError, error } = useGetUsersQuery()

    console.log("USERDATA: ", userData)

    const handleRemoveTent = (item) => {
      setSelectedTents(selectedTents.filter(tent => tent._id !== item._id));
  }

  const handleDeleteUser = (user) => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id !== user._id))
  }

   // Automatically add the groupAdmin to the selectedUsers list
  //  useEffect(() => {
  //   if (userData?.groupAdmin && !selectedUsers.some(user => user._id === userData?.groupAdmin._id)) {
  //     setSelectedUsers([...selectedUsers, groupAdmin])
  //   }
  // }, [groupAdmin, selectedUsers, setSelectedUsers])

  return (

<>
<Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem className="">
    <h2>
      <AccordionButton className="bg-blue-100 hover:bg-blue-300 transition duration-300">
        <Box as='span' flex='1' textAlign='left'>
          <h1 className="text-2xl">Users ({selectedUsers?.length + 1})</h1>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {/* list of users */}
      
      <UserList loadId={loadId} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
    </AccordionPanel>
    <div className="flex flex-wrap">
      <UserBadge item={user} />
        {selectedUsers.map(item => (
            <UserBadge key={item._id} item={item} handleFunction={ ()=> handleDeleteUser(item) } />
        ))}
        </div>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton className="bg-blue-100 hover:bg-blue-300 transition duration-300">
        <Box as='span' flex='1' textAlign='left'>
          <h1 className="text-2xl">Tents ({selectedTents?.length})</h1>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} className='h-56 overflow-y-scroll bg-gray-50 p-2 m-2'>
      {/* list of tents */}
      <TentList loadId={loadId} selectedTents={selectedTents} setSelectedTents={setSelectedTents} />
    </AccordionPanel>
    <div className="flex flex-wrap">
            {selectedTents.map(item => (
                <TentBadge key={item._id} item={item} handleFunction={()=> handleRemoveTent(item)} />
            ))}
        </div>
  </AccordionItem>
</Accordion>
</>
  )
}

export default LoadAccordion