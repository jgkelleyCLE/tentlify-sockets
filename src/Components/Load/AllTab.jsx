import React from 'react'
import { useGetLoadsQuery } from '../../redux/loadApi'
import { FlexRow, FlexColumn } from '../UI'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarGroup, Spinner } from '@chakra-ui/react'
import TentBadge from '../Modals/TentBadge'

const AllTab = () => {


  const { data: loads, isLoading, isSuccess, isError, error } = useGetLoadsQuery()
  console.log(loads)
  const navigate = useNavigate()

  let content;

    if(isLoading){
        content = <FlexColumn><Spinner /></FlexColumn>
    }else if(isSuccess){
        content = loads.map(item => (
            <div className=" relative flex flex-col items-start border-2 border-gray-400 p-2 rounded-md cursor-pointer my-2" onClick={()=> navigate(`/load/${item._id}`)} key={item._id}>
              <FlexRow>
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <h1 className="text-sm text-gray-400 ml-2">{new Date(item.createdAt).toDateString()}</h1>
                </FlexRow>
                <FlexRow>
                    <FlexRow className="gap-2 absolute top-1 right-1"><Avatar size="sm" src={item.groupAdmin.image} name={item.groupAdmin.username} /> {item.groupAdmin.username}</FlexRow>
                </FlexRow>
                    
                    <AvatarGroup size="sm" max={3} className="gap-1.5">
                    {item.users.map(user => (
                        <Avatar size="sm" key={user._id} name={user.username} src={user.image} />
                    ))}
                    </AvatarGroup>
                    <FlexRow className="flex-wrap">
                        {/* <h1 className="text-sm">Tents: {item.tents.length}</h1> */}
                        {item.tents.map(item => (
                        //   <TentBadge key={item._id} item={item} />
                        <div key={item._id} className="bg-purple-100 m-1 rounded-md p-1 line-clamp-1">
                            <h1 className="text-xs">{item.product}</h1>
                        </div>
                        ))}
                    </FlexRow>
                </div>
        ))
    }

  return (
    <div>{content}</div>
  )
}

export default AllTab