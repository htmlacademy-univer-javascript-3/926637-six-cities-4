
import { createAction } from '@reduxjs/toolkit';
import { CityToOffer, OffersSortingType } from '../const';
import { Offer } from '../types/offer';

export const setCityToOffer = createAction<CityToOffer>('setCityToOffer');

export const setOffersSortingType = createAction<OffersSortingType>('setOffersSortingType');

export const fetchOffers = createAction('getOffers');

export const setCurrentOffers = createAction<Offer[]>('setCurrentOffers');

export const setFetchedOffers = createAction<Offer[]>('setFetchedOffers');

export const setIsDoneFetchingOffers = createAction<boolean>('setIsDoneFetchingOffers');
