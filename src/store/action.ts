
import { createAction } from '@reduxjs/toolkit';
import { CityToOffer, OffersSortingType } from '../const';
import { Offer } from '../types/offer';

export const setCityToOffer = createAction<CityToOffer>('setCityToOffer');

export const setOffersSortingType = createAction<OffersSortingType>('setOffersSortingType');

export const fetchOffers = createAction('getOffers');

export const setOffers = createAction<Offer[]>('setOffers');
