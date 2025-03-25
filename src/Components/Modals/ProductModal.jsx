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

const ProductModal = ({ selectedProduct, setSelectedProduct, isOpen, onClose, onOpen }) => {
  console.log('SELECTED PRODUCT IN MODAL: ', selectedProduct);

  return (
    <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedProduct?.product}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex items-center justify-center">
            {/* select schematic if selectedProduct?.category === "Tents" || selectedProduct.category === "Stage" */}
            {selectedProduct?.category === 'Tents' || selectedProduct?.category === 'Stage' ? (
              <img src={selectedProduct?.schematic} alt="schematic" />
            ) : (
              <img src={selectedProduct?.image} alt="productImg" />
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
