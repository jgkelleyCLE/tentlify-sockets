import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import UserList from '../Modals/UserList';
import TentList from '../Modals/TentList';
import UserBadge from '../Modals/UserBadge';
import { FlexRow } from '../UI';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../redux/userApi';
import TentBadge from '../Modals/TentBadge';

const steps = [
  { title: 'Create', description: 'Add Title' },
  { title: 'Users', description: 'Add Users' },
  { title: 'Tents', description: 'Add Tents' },
];

const LoadStepper = ({ selectedUsers, setSelectedUsers, loadId, selectedTents, setSelectedTents }) => {
  const user = useSelector((state) => state.auth.user);

  const { data: userInfo } = useGetUserQuery(user?._id);

  const { activeStep, goToNext, goToPrevious } = useSteps({
    initialStep: 0,
  });

  const handleNext = () => {
    goToNext();
  };

  const handlePrevious = () => {
    goToPrevious();
  };

  const handleRemoveTent = (item) => {
    setSelectedTents(selectedTents.filter((tent) => tent._id !== item._id));
  };

  const handleDeleteUser = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Input required placeholder="Title" />;
      case 1:
        return (
          <Box>
            <UserList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            <FlexRow>
              <UserBadge item={userInfo} />
              {selectedUsers.map((item) => (
                <UserBadge key={item._id} item={item} handleFunction={() => handleDeleteUser(item)} />
              ))}
            </FlexRow>
          </Box>
        );
      case 2:
        return (
          <Box className="max-h-[400px] overflow-y-scroll">
            <TentList selectedTents={selectedTents} setSelectedTents={setSelectedTents} />
            {selectedTents.map((item, index) => (
              <Box>
                <TentBadge key={item._id + index} item={item} handleFunction={() => handleRemoveTent(item)} />
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box width="100%">
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>{renderStepContent(activeStep)}</Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handlePrevious} isDisabled={activeStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} isDisabled={activeStep === steps.length - 1}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LoadStepper;
