import {createReducer} from '@reduxjs/toolkit';

import {Offers} from '../types/offer.ts';
import {changeCity, setOffers} from './action.ts';

export interface AppState {
  city: string;
  offers: Offers;
}

const initialState: AppState = {
  city: 'Paris', // город по умолчанию
  offers: [], // изначально пустой список
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
