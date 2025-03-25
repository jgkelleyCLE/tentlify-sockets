import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { FlexColumn } from '../UI';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import { useEditUserMutation, useGetUserQuery } from '../../redux/userApi';
import { useSelector } from 'react-redux';

const EditModal = ({ isOpen, onClose, onOpen, userInfo, refetch }) => {
  const fileInputRef = useRef(null);
  const toast = useToast();

  const user = useSelector((state) => state.auth.user);
  const { data: userInformation } = useGetUserQuery(user?._id);

  const [file, setFile] = useState([]);
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const [formData, setFormData] = useState({
    username: userInfo?.username,
    image: userInfo?.image || '',
  });

  console.log('FORM DATA: ', formData);

  const [username, setUsername] = useState(userInfo?.username);

  const [
    editUser,
    { data: userData, isSuccess: editSuccess, isLoading, isError: editError, error },
  ] = useEditUserMutation();

  const uploadImageHandler = async (file) => {
    if (file) {
      console.log('uploading file', file);

      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }

      try {
        // const urls = await Promise.all(promises)
        // setFormData({ ...formData, image: formData.image.concat(urls) })
        const url = await storeImage(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: url,
        }));
        setImageUploadError(false);
        setUploading(false);
      } catch (error) {
        setImageUploadError('ERROR: Image upload failed (2 mb max per image)');
        setUploading(false);
      }
    } else {
      setImageUploadError('ERROR: Upload at least 1 image.');
      setUploading(false);
    }
  };

  const storeImage = async (image) => {
    const fileName = image.name + new Date().getTime();
    const storageRef = ref(storage, `avatars/${userInfo?.username}-${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    });

    try {
      await uploadTask;
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = () => {
    editUser({ id: userInfo._id, username: formData.username, image: formData.image });
    setComplete(true);
    // onClose()
  };

  useEffect(() => {
    console.log('IS SUCCESS: ', editSuccess);

    if (editSuccess) {
      toast({
        title: 'User updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
      // refetch()
    }

    if (editError) {
      toast({
        title: 'Error updating user',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  }, [editSuccess, editError, complete]);

  useEffect(() => {
    if (file) {
      uploadImageHandler(file);
    }
  }, [file]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {userInfo?.username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FlexColumn>
              <p className="text-gray-400 text-sm italic">Click Avatar to select new image</p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {formData.image ? (
                <Avatar
                  size="2xl"
                  name={userInfo?.username}
                  src={formData.image}
                  alt="userAvatar"
                  className="rounded-full w-40 h-40 my-2"
                />
              ) : (
                <Avatar
                  onClick={() => fileInputRef.current.click()}
                  src={userInfo?.image}
                  name={userInfo?.username}
                  size="xl"
                  alt="userAvatar"
                  className="cursor-pointer rounded-full w-40 h-40 my-2"
                />
              )}
              {/* <Avatar onClick={() => fileInputRef.current.click()} src={userInfo?.image} name={userInfo?.username} size="xl" alt="userAvatar" className="cursor-pointer rounded-full w-40 h-40 my-2" /> */}

              {uploading ? <p>{uploadProgress.toFixed(2)}%</p> : null}

              <Input
                placeholder="Username"
                defaultValue={userInfo?.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </FlexColumn>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => editHandler()}>
              {isLoading ? <Spinner color="white" /> : 'Update'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
