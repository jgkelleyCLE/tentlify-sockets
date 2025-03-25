import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserFavoritesQuery, useRemoveTentFromFavoritesMutation } from '../../redux/userApi';
import { FlexColumn, FlexRow } from '../UI';
import { SimpleGrid, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CalcBox } from '../Calculator/Calulator.styles';

const Favorites = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const toast = useToast();

  const { data: favorites, isLoading, isSuccess, isError, error } = useGetUserFavoritesQuery(user?._id);

  const [
    removeTent,
    {
      data: removeData,
      isLoading: removeLoading,
      isSuccess: removeSuccess,
      isError: isRemoveError,
      error: removeError,
    },
  ] = useRemoveTentFromFavoritesMutation();

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = favorites?.map((item) => (
      <div
        className=" cursor-pointer p-2 m-1  bg-white rounded-md hover:shadow-md transition duration-300 relative "
        key={item._id}
        onClick={() => navigate(`/tent/${item._id}`)}
      >
        <FlexRow className="w-full">
          <img className="w-12 h-12 object-cover rounded-md mr-2" src={item.image} alt={item.product} />
          <div>
            <h1 className="text-sm line-clamp-1">{item.product}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
                removeHandler(item);
              }}
              className="text-xs absolute z-30 text-red-400 hover:text-red-500"
              style={{ zIndex: 10 }} // Ensure the button has a higher z-index
            >
              Remove
            </button>
          </div>
        </FlexRow>
      </div>
    ));
  }

  const removeHandler = (item) => {
    // console.log("remove", item)
    removeTent({ tentId: item._id });
  };

  useEffect(() => {
    if (removeSuccess) {
      toast({
        title: 'Removed from favorites',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    if (isRemoveError) {
      toast({
        title: 'Error removing from favorites',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [removeSuccess, isRemoveError]);

  return (
    <CalcBox className="mb-3">
      <h1 className="text-xl">Favorites</h1>
      <SimpleGrid columns={[1, 2]} className="gap-1 w-full">
        {content}
      </SimpleGrid>
      {favorites?.length === 0 ? <h1 className="text-lg text-gray-400 italic my-4">No favorites yet</h1> : null}
    </CalcBox>
  );
};

export default Favorites;
