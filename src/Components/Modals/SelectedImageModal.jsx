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

const SelectedImageModal = ({ selectedImage, onOpen, isOpen, onClose }) => {
  return (
    <Modal size="4xl" isCentered w="100%" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton style={{ backgroundColor: '#ffffffb8' }} />
        <ModalBody p="1.5">
          <img className="rounded-md" src={selectedImage} />
        </ModalBody>

        {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default SelectedImageModal;
