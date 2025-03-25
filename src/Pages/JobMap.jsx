import React, { useState, useEffect, useRef } from 'react';
import Map, { Layer, Source } from 'react-map-gl';

import { useSelector } from 'react-redux';
import MapPins from '../Components/Map/MapPins';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import ThemeModal from '../Components/Modals/ThemeModal';
import { FaPaintBrush } from 'react-icons/fa';
import AddJob from '../Components/Map/AddJob';

const JobMap = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.auth.user);
  const mapTheme = useSelector((state) => state.map.theme);
  const navigate = useNavigate();

  const [mapCenter, setMapCenter] = useState(null);
  let storedViewState = JSON.parse(localStorage.getItem('mapViewport'));

  // Retrieve viewport state from local storage when component mounts
  useEffect(() => {
    let storedViewState = localStorage.getItem('mapViewport');
    if (storedViewState) {
      setViewState(JSON.parse(storedViewState));
    }
  }, []);

  const [viewState, setViewState] = useState({
    longitude: storedViewState ? storedViewState[0] : -81.695574,
    latitude: storedViewState ? storedViewState[1] : 41.501329,
    zoom: storedViewState ? storedViewState[2] : 8,
  });

  //Store viewport state in local storage when it changes
  useEffect(() => {
    localStorage.setItem('mapViewport', JSON.stringify(viewState));
  }, [viewState]);

  const onMove = React.useCallback(({ viewState }) => {
    const newCenter = [viewState.longitude, viewState.latitude, viewState.zoom];

    setViewState(newCenter);
  }, []);

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const [newLocation, setNewLocation] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const mapRef = useRef(null);
  // const mapTheme = useSelector(state => state.map.theme)

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // FUNCTION TO FLY TO LOCATION ON SEARCH
  const mapFly = (centerPoint) => {
    mapRef.current?.flyTo({ center: centerPoint, zoom: 9 });
  };

  const clickFly = (centerPoint) => {
    const middleLat = centerPoint.lat;
    const middleLong = centerPoint.long;

    // mapRef.current?.flyTo({ center: [middleLong, middleLat], zoom: 9 });
    mapRef.current?.flyTo({ center: [middleLong, middleLat] });
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    console.log('DOUBLE CLICKED');

    const { lng, lat } = e.lngLat;

    setNewLocation({
      lat,
      lng,
    });
    setVisible(true);

    mapRef.current?.flyTo({ center: [lng, lat], zoom: 11 });
  };

  const skyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15,
    },
  };

  const pressTimer = useRef(null);

  const handleLongPress = (e) => {
    // Handle long press action here

    const { lng, lat } = e.lngLat;

    setNewLocation({
      lat,
      lng,
    });
    setVisible(true);

    mapRef.current?.flyTo({ center: [lng, lat], zoom: 10 });
  };

  return (
    <div className="relative h-full supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
        {...viewState}
        onMove={onMove}
        initialViewState={{
          longitude: -81.695574,
          latitude: 41.501329,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapTheme}
        doubleClickZoom={false}
        onDblClick={user ? handleAddLocation : null}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />

        <button
          onClick={onOpen}
          className="flex items-center gap-2 absolute bottom-1 right-1 z-40 bg-red-500/90 p-2 rounded-md text-white text-3xl"
        >
          <FaPaintBrush />
        </button>

        <ThemeModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />

        {newLocation ? (
          <AddJob
            visible={visible}
            setVisible={setVisible}
            longitude={newLocation.lng}
            latitude={newLocation.lat}
            newLocation={newLocation}
            setNewLocation={setNewLocation}
          />
        ) : null}

        <MapPins clickFly={clickFly} />
      </Map>
    </div>
  );
};

export default JobMap;
