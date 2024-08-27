import React from 'react'
import { useGetLoadsQuery } from '../redux/loadApi'
import { FlexColumn, FlexRow } from '../Components/UI'
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import LoadTabs from '../Components/Load/LoadTabs'

const Loads = () => {

    const navigate = useNavigate()
    

  return (
    <FlexColumn>
        
        <LoadTabs />
    </FlexColumn>
  )
}

export default Loads