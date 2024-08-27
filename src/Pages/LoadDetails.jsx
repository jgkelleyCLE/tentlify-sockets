import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetLoadQuery } from '../redux/loadApi'
import { FlexColumn, FlexRow } from '../Components/UI'
import { Spinner, AvatarGroup, Avatar, Tooltip } from '@chakra-ui/react'
import TentPartAccordion from '../Components/Load/TentPartAccordion'
import { FaStar } from 'react-icons/fa'
import TentParts from '../Components/Load/TentParts'
import NoSocketsAccordion from '../Components/Load/NoSocketsAccordion'

let endpoint = "http://localhost:3001"
let socket

const LoadDetails = () => {

  const { id } = useParams()

const [fetchedLoad, setFetchedLoad] = useState(null)

  const { data: load, isLoading, isSuccess, isError, error } = useGetLoadQuery(id)

  console.log("LOAD before being passed anywhere: ", load)

  useEffect(()=> {

    if(isSuccess){
      setFetchedLoad(load)
    }

  }, [])


  let content;

  if(isLoading){
    content = <FlexColumn><Spinner /></FlexColumn>
  }else if(isSuccess){
    content = <FlexColumn className="gap-2">
      <h1 className="text-3xl">{load?.title}</h1>
      <FlexRow>
        <div className="relative" >
          <Tooltip label={load?.groupAdmin?.username} aria-label="A tooltip">
        <Avatar name={load?.groupAdmin?.username} src={load?.groupAdmin?.image} />
        </Tooltip>
        <FaStar className="text-yellow-400 text-xl ml-2 absolute bottom-8 left-5" />
        </div>
        
        {load?.users?.map(user => (
          <Tooltip key={user._id} label={user?.username} aria-label="A tooltip">
            <AvatarGroup className="">
          <Avatar key={user._id} name={user?.username} src={user?.image} />
          </AvatarGroup>
          </Tooltip>
        ))}
        </FlexRow>
      
      <div>
        
        <h1 className="text-gray-400 text-sm italic">Created: {new Date(load?.createdAt).toDateString()}</h1>
      </div>
      <div className="w-11/12">
        {load?.tents?.map(item => (
          // <TentPartAccordion key={item._id} item={item} />
          // <TentParts key={item._id} item={item} />
          <NoSocketsAccordion key={item._id} item={item} />
        ))}
      </div>
    </FlexColumn>
  }else if(isError){
    content = <FlexColumn><h1>{error.message}</h1></FlexColumn>
    console.log(error)
  }


  return (
    <div className="mt-10">{content}</div>
  )
}

export default LoadDetails

