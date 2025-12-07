import {createReducer} from '@reduxjs/toolkit';

import {FullOffer, Offers} from '../types/offer.ts';
import {changeCity, setCurrentOffer, setOffers, setOffersLoadingStatus} from './action.ts';
import {AuthorizationStatus} from '../const.ts';

export interface AppState {
  city: string;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  offers: Offers;
  currentOffer?: FullOffer;
}

const initialState: AppState = {
  city: 'Paris', // город по умолчанию
  isLoading: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  offers: [], // изначально пустой список
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    });
});

export {reducer};
