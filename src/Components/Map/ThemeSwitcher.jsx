import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../redux/mapSlice';
import { SimpleGrid } from '@chakra-ui/react';
import { StyledRadio, RadioLabel } from './Map.styles';

const ThemeSwitcher = () => {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('selectedTheme'));

  const dispatch = useDispatch();

  const themes = [
    {
      id: 'satellite-streets-v12',
      name: 'Satellite',
      value: 'mapbox://styles/jackiewebdev/clfbmgxpg00bm01ocbxzrhe2l',
      // value: 'mapbox://styles/jackiewebdev/clfbmgxpg00bm01ocbxzrhe2l',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_satellite_OPT.jpg?alt=media&token=6e2bc533-c2ed-4889-b100-c2d065a81e13',
      ringColor: 'rgb(0, 213, 255)',
    },
    {
      id: 'light-v11',
      name: 'Light',
      value: 'mapbox://styles/jackiewebdev/cls8xp72y02kj01p5c4cl9dm2',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_light_OPT.jpg?alt=media&token=0e517cd1-2a5c-448d-b94f-32372fecf118',
      ringColor: 'rgb(10, 0, 114)',
    },
    {
      id: 'dark-v11',
      name: 'Dark',
      value: 'mapbox://styles/jackiewebdev/cls277las01ri01p1gpls3d7s',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_dark_OPT.jpg?alt=media&token=0d251ac3-8490-42f6-bb61-98e934f97488',
      ringColor: 'rgb(64, 255, 0)',
    },
    // {
    //   id: 'dark-v11',
    //   name: 'Dark',
    //   value: 'https://api.mapbox.com/styles/v1/mapbox/dark-v11',
    //   image:
    //     'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_dark_OPT.jpg?alt=media&token=0d251ac3-8490-42f6-bb61-98e934f97488',
    //     ringColor: 'rgb(64, 255, 0)',
    // },

    {
      id: 'streets-v12',
      name: 'Midnight',
      value: 'mapbox://styles/jackiewebdev/clfln7zdw002r01n6o83cxjja',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmpaTheme_midnight_OPT.jpg?alt=media&token=abcfc1fe-4d38-4091-bcf5-bf50ec13cc1e',
      ringColor: 'rgb(238, 255, 0)',
    },
    {
      id: 'outdoors-v12',
      name: 'Default',
      value: 'mapbox://styles/jackiewebdev/cla8oqkx1001315p6jdv081ig',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_default_OPT.jpg?alt=media&token=b2c5a427-414c-4461-897b-3353e0ac511b',
      ringColor: 'rgb(255, 0, 0)',
    },
    {
      id: 'basic-v12',
      name: 'Basic',
      value: 'mapbox://styles/jackiewebdev/cls0mndd501lh01nlavz63kmv',
      image:
        'https://firebasestorage.googleapis.com/v0/b/travel-website-28d46.appspot.com/o/Do%20Not%20Delete%2FmapTheme_Basic_OPT.jpg?alt=media&token=723c1c2f-35d2-45ef-b222-a1487decef77',
      ringColor: 'rgb(149, 0, 255)',
    },
  ];

  const themeList = themes.map((item) => (
    <div key={item.id} className={`w-full lg:m-2 ${item.id === selectedTheme ? 'bg-green-200' : 'bg-blue-200'}`}>
      <div className="flex items-center justify-between">
        <RadioLabel
          htmlFor={item.id}
          className="w-full bg-white/40 hover:bg-white/60 duration-300 rounded-md m-1 flex items-center justify-between text-2xl pr-8"
        >
          <StyledRadio
            type="radio"
            id={item.id}
            value={item.value}
            className="hidden m-1"
            name="rtoggle"
            onChange={(e) => {
              dispatch(setTheme(e.target.value));
              setSelectedTheme(item.id);
              localStorage.setItem('selectedTheme', item.id);
            }}
          />
          <img className="lg:w-52 lg:h-24 w-20 h-16 object-cover rounded-md m-[2px] " src={item.image} />
          <h1>{item.name}</h1>
        </RadioLabel>
      </div>
    </div>
  ));

  return (
    <div>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
        {themeList}
      </SimpleGrid>
    </div>
  );
};

export default ThemeSwitcher;
