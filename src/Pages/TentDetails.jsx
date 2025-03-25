import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTentQuery } from '../redux/tentApi';
import { FlexColumn, PageContainer } from '../Components/UI';
import { Spinner, useToast } from '@chakra-ui/react';
import {
  DataCard,
  TableHeader,
  TableRow,
  DataCell,
  DataCellQty,
  DataCellItem,
  Checkbox,
  TableBody,
  FavoriteButton,
} from '../Components/Home/TentDetails.styles';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddTentToFavoritesMutation,
  useGetUserFavoritesQuery,
  useRemoveTentFromFavoritesMutation,
} from '../redux/userApi';
import { MdOutlineHeartBroken } from 'react-icons/md';

const TentDetails = () => {
  const toast = useToast();

  const user = useSelector((state) => state.auth.user);
  console.log('user', user);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: tent, isLoading, isSuccess, isError, error } = useGetTentQuery(id);

  const { data: userFaves } = useGetUserFavoritesQuery(user?._id);

  console.log('userFaves', userFaves);

  const [
    addFavorite,
    { data: faveData, isLoading: loadingFave, isSuccess: faveSuccess, isError: faveError, error: errorFave },
  ] = useAddTentToFavoritesMutation();

  const [
    removeTent,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess, isError: removeError, error: errorRemove },
  ] = useRemoveTentFromFavoritesMutation();

  const tentAlreadyFaved = userFaves?.some((fave) => fave._id === tent?._id);

  let content;

  if (isLoading) {
    content = (
      <FlexColumn>
        <Spinner size="xl" />
      </FlexColumn>
    );
  } else if (isSuccess) {
    content = (
      <FlexColumn>
        <FlexColumn>
          <h1 className="text-2xl my-1">{tent.product}</h1>
          <img className="w-full max-w-3xl lg:rounded-lg" src={tent.image} alt={tent.product} />

          {/* {tentAlreadyFaved ? <p className='text-red-600'>Already in favorites</p> : null} */}
          {tentAlreadyFaved ? (
            <FavoriteButton onClick={() => removeHandler(tent)}>
              <MdOutlineHeartBroken className="text-red-500 text-3xl mr-2" />
              Remove from favorites
            </FavoriteButton>
          ) : (
            <FavoriteButton onClick={() => faveHandler(tent)}>
              <AiFillHeart className="mr-2 text-3xl text-red-600" />
              Add to favorites
            </FavoriteButton>
          )}
        </FlexColumn>

        <DataCard>
          <table className="w-full px-2">
            <thead className="w-full mx-4">
              <TableRow>
                <TableHeader>{tent.product} Parts</TableHeader>
              </TableRow>
            </thead>
          </table>
          {tent?.parts?.map((part, idx) => (
            <TableBody key={idx}>
              <thead>
                <TableRow>
                  <DataCell>
                    <Checkbox type="checkbox" className="checkbox checkbox-success border-2 border-success " />
                  </DataCell>
                  <DataCellQty>{part.quantity}</DataCellQty>
                  <DataCellItem>{part.item}</DataCellItem>
                </TableRow>
              </thead>
            </TableBody>
          ))}
        </DataCard>
      </FlexColumn>
    );
  }

  const faveHandler = (item) => {
    if (tentAlreadyFaved) {
      console.log('ALREADY IN FAVESSSSSSSS');
      return toast({
        title: 'Already in favorites',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else {
      console.log('NOT IN FAVES --- ADDING!!!!');
      addFavorite({ tentId: item._id });
    }
  };

  const removeHandler = (tent) => {
    console.log('tent in remove handler', tent);

    removeTent({ tentId: tent._id });
  };

  useEffect(() => {
    ``;

    if (removeSuccess) {
      toast({
        title: 'Removed from favorites',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    if (removeError) {
      toast({
        title: 'Error',
        description: `ERROR: ${errorRemove}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [removeSuccess, removeError]);

  useEffect(() => {
    if (faveSuccess) {
      toast({
        title: 'Added to Favorites',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }

    if (errorFave) {
      toast({
        title: 'Error',
        description: errorFave.data,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [faveSuccess, errorFave]);

  return <PageContainer>{content}</PageContainer>;
};

export default TentDetails;
