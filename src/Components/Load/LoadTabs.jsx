import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import InvolvingTab from './InvolvingTab'
import AdminTab from './AdminTab'
import AllTab from './AllTab'
import { FlexColumn } from '../UI'

const LoadTabs = () => {
  return (
    <FlexColumn className="mt-10">
        <Tabs variant='soft-rounded' colorScheme='green' className="w-11/12 border border-gray-300 p-2 rounded-md">
  <TabList className="w-full">
    <Tab>Involving You</Tab>
    <Tab>Created by you</Tab>
    <Tab>All Loads</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <InvolvingTab />
    </TabPanel>
    <TabPanel>
      <AdminTab />
    </TabPanel>
    <TabPanel>
      <AllTab />
    </TabPanel>
  </TabPanels>
</Tabs>
    </FlexColumn>
  )
}

export default LoadTabs