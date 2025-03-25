import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobQuery } from '../redux/jobApi';
import { FlexColumn, FlexRow } from '../Components/UI';
import { Button, Spinner, useToast, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import SelectedImageModal from '../Components/Modals/SelectedImageModal';

const JobDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { id } = useParams();
  const { data: job, isLoading, isSuccess, isError, error } = useGetJobQuery(id);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expose, setExpose] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(job);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner size="xl" />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <FlexColumn className="relative">
        <img className="w-[100%] lg:h-[700px]  h-[350px] object-cover" src={job?.images[0]} />

        <FlexColumn>
          <h1 className="text-xl lg:text-2xl mt-2 pl-2">
            {job?.location} - {job?.city}
          </h1>
          <h1 className="text-gray-400 italic">Setup: {new Date(job?.setupDate).toDateString()}</h1>

          <FlexRow className="mb-2">
            {/* <button className="text-2xl  text-blue-500 p-2 rounded-md hover:bg-gray-300/60 transition duration-300 mx-1" onClick={()=> setExpose(true)} ><MdEdit /></button> */}
            {user?._id === job?.userId ? (
              <button
                className="text-2xl  text-red-500 p-2 rounded-md hover:bg-gray-300/60 transition duration-300"
                onClick={() => setShow(true)}
              >
                <MdDeleteOutline />
              </button>
            ) : null}
          </FlexRow>
        </FlexColumn>
        <FlexRow className="flex-wrap">
          {job?.images.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setOpen(!open);
                onOpen();
                setSelectedImage(item);
              }}
            >
              <img
                className="lg:w-40 lg:h-32 w-20 h-20 object-cover rounded-md m-2 cursor-pointer hover:opacity-90 transition duration-300"
                src={item}
              />
            </div>
          ))}
        </FlexRow>
        <FlexColumn className="my-2 mb-8">
          <div className="bg-gray-200 p-3 rounded-md w-[50%]">
            <h1>
              <span className="font-bold">Notes:</span> {job?.notes}
            </h1>
          </div>
        </FlexColumn>
      </FlexColumn>
    );
  }

  return (
    <div>
      {content}
      <SelectedImageModal
        isOpen={isOpen}
        onClose={onClose}
        open={open}
        setOpen={setOpen}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default JobDetails;
