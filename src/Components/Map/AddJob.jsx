import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { FlexColumn, FlexRow } from '../UI';
import { useCreateJobMutation } from '../../redux/jobApi';
import { storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { MdOutlineClose } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddJob = ({ visible, setVisible, latitude, longitude, setNewLocation, onClose }) => {
  const toast = useToast();

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [createJob, { data: jobData, isSuccess, isLoading, isError, error }] = useCreateJobMutation();

  const [formData, setFormData] = useState({
    location: '',
    city: '',
    lat: latitude,
    long: longitude,
    setupData: '',
    notes: '',
    images: [],
    setupDate: '',
    notes: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.location.trim() === '' || formData.city.trim() === '' || formData.images == []) {
      setImageUploadError('Error: Please fill out all fields and upload an image.');
      return;
    } else if (formData.city && formData.location && formData.images.length > 0) {
      createJob(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        location: '',
        city: '',
        images: [],
      });
      toast({
        title: 'Job Added!',
        description: `${jobData.city} has been added.`, ///skdjhcksjdhcksjdkcjsndc
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setVisible(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error!',
        description: `${imageUploadError}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      console.log(error);
    }
  }, [isError]);

  const uploadImageHandler = async (files) => {
    if (files.length > 0 && files.length + formData.images.length < 11) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);
        setFormData({ ...formData, images: formData.images.concat(urls) });
        setImageUploadError(false);
        setUploading(false);
      } catch (error) {
        setImageUploadError('ERROR: Image upload failed (2 mb max per image)');
        setUploading(false);
      }
    } else {
      setImageUploadError('ERROR: Upload at least 1 image. 6 images max');
      setUploading(false);
    }
  };

  const storeImage = async (image) => {
    const fileName = image.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
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

  const deleteImageHandler = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={() => {
          setVisible(!visible);
          setNewLocation(null);
        }}
        isOpen={visible}
      >
        <DrawerOverlay />
        <DrawerContent sx={{ backgroundColor: 'rgba(255,255,255, 0.95)' }}>
          <DrawerCloseButton />
          <DrawerHeader sx={{ backgroundColor: 'white' }} borderBottomWidth="1px">
            Add Location{' '}
            <span className="text-gray-400 italic text-sm ml-4">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </span>
          </DrawerHeader>
          <DrawerBody
            sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="w-11/12 flex flex-col items-center   rounded-md  max-w-[1000px]">
              <form onSubmit={submitHandler} className="w-11/12">
                <FlexColumn>
                  <FormControl>
                    <FlexColumn className="md:flex-row ">
                      <div className="mx-2 w-[100%]">
                        <FormLabel sx={{ marginBottom: -0.5 }}>Location</FormLabel>
                        <Input
                          placeholder="Location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="mx-2 w-[100%]">
                        <FormLabel sx={{ marginBottom: -0.5 }}>City</FormLabel>
                        <Input
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </FlexColumn>
                  </FormControl>
                </FlexColumn>
                <FlexColumn>
                  <DatePicker
                    required
                    className="border border-gray-300 w-[100%] rounded-md my-2 p-2"
                    placeholderText="Setup Date"
                    selected={formData.setupDate}
                    onChange={(date) => setFormData({ ...formData, setupDate: date })}
                  />

                  <Textarea
                    className="w-full p-2 rounded-md"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />

                  {/* //UPLOAD IMAGES */}
                  <h1 className="text-lg font-semibold text-start">Upload Images</h1>
                  <p className="text-gray-400 italic text-sm mb-2">Note: First image will be cover (max: 10)</p>
                  <div className="flex flex-col md:flex-row w-full gap-2 items-center">
                    <input
                      className="p-3 border-2 border-dashed w-full"
                      required
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <button
                      disabled={uploading ? true : false}
                      type="button"
                      onClick={() => uploadImageHandler(files)}
                      className="bg-green-500 p-3 px-6 rounded-md text-white h-full min-w-[130px] flex items-center justify-center mb-2"
                    >
                      {uploading ? <Spinner /> : 'Upload'}
                    </button>
                  </div>
                  <div className="w-full">
                    {uploading ? (
                      <FlexColumn>
                        <h1>{Math.round(uploadProgress)}%</h1>
                        <div
                          style={{ width: `${uploadProgress}%` }}
                          className="h-2 bg-green-500 rounded-full transition-all duration-500"
                        ></div>
                      </FlexColumn>
                    ) : null}
                  </div>

                  <div className="flex flex-row items-center flex-wrap mt-2">
                    {formData.images
                      ? formData.images.map((item, index) => (
                          <div key={index} className="relative">
                            <img
                              className="w-20 h-20 md:w-32 md:h-24 lg:w-40 lg:h-28 object-cover m-1 rounded-md relative"
                              src={item}
                              alt="uploaded-image"
                            />
                            <button
                              type="button"
                              onClick={() => deleteImageHandler(index)}
                              className="bg-red-600 rounded-full w-7 h-7 cursor-pointer z-10 flex items-center justify-center px-1 text-white absolute top-0 right-0 border-2 border-white"
                            >
                              <MdOutlineClose />
                            </button>
                          </div>
                        ))
                      : null}
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-700 hover:bg-gray-600 transition duration-300 text-white p-3 rounded-md w-full max-w-[500px] mt-4 flex items-center justify-center"
                  >
                    {isLoading ? <Spinner /> : 'Create Job'}
                  </button>

                  <p className="text-red-500 italic">{imageUploadError}</p>
                </FlexColumn>
              </form>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddJob;
