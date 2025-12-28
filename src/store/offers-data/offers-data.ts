import {createSlice} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../../types/offer.ts';
import {fetchNearbyOffers, fetchOfferById, fetchOffers} from '../api-actions/offers.ts';
import {NameSpace} from '../../const.ts';
import {toggleFavorite} from '../api-actions/favorites.ts';
import {updateOffers} from '../../services/utils.ts';

type OffersDataState = {
  offers: Offers;
  currentOffer: FullOffer | null;
  nearbyOffers: Offers;
  favoriteOffers: Offers;
  isLoading: boolean;
  isFavoriteLoading: boolean;
}

const initialState: OffersDataState = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  isLoading: false,
  isFavoriteLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;

        state.offers = updateOffers(state.offers, updated);
        state.nearbyOffers = updateOffers(state.nearbyOffers, updated);
        if (state.currentOffer?.id === updated.id) {
          state.currentOffer = updated;
        }
      });
  },
});

