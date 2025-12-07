import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer.ts';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offers>('offers/set');
