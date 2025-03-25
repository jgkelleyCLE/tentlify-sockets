import React, { useState } from 'react';
import { useGetAllJobsQuery } from '../../redux/jobApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FlexColumn } from '../UI';
import { Spinner } from '@chakra-ui/react';
import { Marker, Popup } from 'react-map-gl';
import {
  MarkerImage,
  PingSpan,
  PopupCloseButton,
  PopupImg,
  PopupDetails,
  PopupTitle,
  ViewDetailsButton,
} from './Map.styles';
import './popup.css';

const MapPins = ({ clickFly }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const { data: jobs, isLoading, isError, isSuccess, error } = useGetAllJobsQuery();

  const theme = useSelector((state) => state.map.theme);
  const ringcolor = theme.ringColor;

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner color="green" size="xl" className="z-20 mt-20" />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = jobs?.map((item) => (
      <div key={item._id} className="bg-red-500">
        <Marker
          className="hover:scale-150 cursor-pointer relative "
          longitude={item.long}
          latitude={item.lat}
          anchor="bottom"
          onClick={() => handleMarkerClick(item)}
        >
          <MarkerImage className="w-12 h-12 rounded-full" src={item.images[0]} alt={item.location} />
          <PingSpan></PingSpan>
        </Marker>

        {item._id === currentPlaceId ? (
          <Popup
            className="rounded-xl"
            style={{ width: '350px', borderRadius: '25px', padding: 0 }}
            longitude={item.long}
            latitude={item.lat}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            maxWidth="90%"
            onClose={() => setCurrentPlaceId(null)}
          >
            <PopupCloseButton onClick={() => setCurrentPlaceId(null)}>Close</PopupCloseButton>
            <PopupImg className="mapboxgl-popup-content" src={item.images[0]} alt={item.location} />
            <PopupDetails>
              <PopupTitle>{item.location}</PopupTitle>
              <ViewDetailsButton onClick={() => navigate(`/job/${item._id}`)}>View Details</ViewDetailsButton>
            </PopupDetails>
          </Popup>
        ) : null}
      </div>
    ));
  }

  const handleMarkerClick = (item) => {
    setCurrentPlaceId(item._id);
    clickFly(item);
  };

  return <div>{content}</div>;
};

export default MapPins;
