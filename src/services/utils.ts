import {Offer, Offers} from '../types/offer.ts';

export const getRatingWidth = (rate: number): string =>
  `${(Math.round(rate) / 5) * 100}%`;

export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

export const updateOffers = (offers: Offers, updatedOffer: Offer): Offers =>
  offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
