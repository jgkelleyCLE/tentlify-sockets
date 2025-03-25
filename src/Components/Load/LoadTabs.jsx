import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import InvolvingTab from './InvolvingTab';
import AdminTab from './AdminTab';
import AllTab from './AllTab';
import { FlexColumn } from '../UI';

const LoadTabs = () => {
  return (
    <FlexColumn className="mt-10 w-11/12 max-w-[1200px]">
      <Tabs variant="soft-rounded" colorScheme="green" className="w-11/12 border border-gray-300 p-2 rounded-md">
        <TabList className="w-full flex items-center justify-between">
          <Tab className="mx-4 w-full">Involving You</Tab>
          <Tab className="mx-4 w-full">Created By you</Tab>
          <Tab className="mx-4">All</Tab>
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
  );
};

export default LoadTabs;
