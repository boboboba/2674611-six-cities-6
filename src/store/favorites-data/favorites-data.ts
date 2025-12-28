import {createSlice} from '@reduxjs/toolkit';
import {Offers} from '../../types/offer.ts';
import {NameSpace} from '../../const.ts';
import {fetchFavorites, toggleFavorite} from '../api-actions/favorites.ts';

type FavoriteOffersDataState = {
  favoriteOffers: Offers;
  isLoading: boolean;
}

const initialState: FavoriteOffersDataState = {
  favoriteOffers: [],
  isLoading: false,
};

export const favoritesData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        state.favoriteOffers = updated.isFavorite
          ? [...state.favoriteOffers.filter((f) => f.id !== updated.id), updated]
          : state.favoriteOffers.filter((f) => f.id !== updated.id);
      });
  },
});

