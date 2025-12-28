import {createAsyncThunk} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../../types/offer.ts';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../const.ts';

export const fetchFavorites = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
    return data;
  });

export const toggleFavorite = createAsyncThunk<
  FullOffer,
  {
    offerId: string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/addFavorite',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<FullOffer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return data;
  });
