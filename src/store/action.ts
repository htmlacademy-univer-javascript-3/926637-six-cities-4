
import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, CityToOffer, OffersSortingType } from '../const';
import { Offer, OfferDetailed } from '../types/offer';
import { UserData } from '../types/user-data';
import { OfferComment } from '../types/offer-comment';

export const setCityToOffer = createAction<CityToOffer>('setCityToOffer');

export const setOffersSortingType = createAction<OffersSortingType>('setOffersSortingType');

export const fetchOffers = createAction('getOffers');

export const setCurrentOffers = createAction<Offer[]>('setCurrentOffers');

export const setIsDoneFetchingOffers = createAction<boolean>('setIsDoneFetchingOffers');

export const setFavoriteOffers = createAction<Offer[]>('setFavoriteOffers');

export const setIsDoneFetchingFavoriteOffers = createAction<boolean>('setIsDoneFetchingFavoriteOffers');

export const setFetchedOffers = createAction<Offer[]>('setFetchedOffers');

export const setIsDoneFetchingOfferComments = createAction<boolean>('setIsDoneFetchingOfferComments');

export const setUserData = createAction<UserData | null>('setUserData');

export const setOfferComments = createAction<OfferComment[]>('setOfferComments');

export const setCurrentClosestOffers = createAction<Offer[]>('setCurrentClosestOffers');

export const setIsDoneFetchingClosestOffers = createAction<boolean>('setIsDoneFetchingClosestOffers');

export const setCurrentOffer = createAction<OfferDetailed>('setCurrentOffer');

export const setIsDoneFetchingCurrentOffer = createAction<boolean>('setIsDoneFetchingCurrentOffer');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const requireAuthorization = createAction<AuthStatus>('requireAuthorization');
