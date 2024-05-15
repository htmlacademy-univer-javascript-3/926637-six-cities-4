
import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, CityToOffer, OffersSortingType } from '../const';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';

export const setCityToOffer = createAction<CityToOffer>('setCityToOffer');

export const setOffersSortingType = createAction<OffersSortingType>('setOffersSortingType');

export const fetchOffers = createAction('getOffers');

export const setCurrentOffers = createAction<Offer[]>('setCurrentOffers');

export const setFavoriteOffers = createAction<Offer[]>('setFavoriteOffers');

export const setFetchedOffers = createAction<Offer[]>('setFetchedOffers');

export const setIsDoneFetchingOffers = createAction<boolean>('setIsDoneFetchingOffers');

export const setUserData = createAction<UserData | null>('setUserData');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const requireAuthorization = createAction<AuthStatus>('requireAuthorization');
