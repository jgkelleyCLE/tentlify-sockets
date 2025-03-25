import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import ThemeSwitcher from '../Map/ThemeSwitcher';

const ThemeModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent sx={{ backgroundColor: 'rgba(255, 255, 255, 0.90)' }} w="95vw">
          <ModalHeader sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>Change Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ThemeSwitcher />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThemeModal;
