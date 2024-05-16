import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, CityToOffer, OffersSortingType } from '../const';
import { Offer, OfferDetailed } from '../types/offer';
import { setCityToOffer, setIsDoneFetchingOffers, setCurrentOffers, setOffersSortingType, setFetchedOffers, requireAuthorization, setFavoriteOffers, setUserData, setOfferComments, setIsDoneFetchingOfferComments, setCurrentClosestOffers, setIsDoneFetchingClosestOffers, setCurrentOffer, setIsDoneFetchingCurrentOffer, setIsDoneFetchingFavoriteOffers } from './action';
import { UserData } from '../types/user-data';
import { OfferComment } from '../types/offer-comment';

type StateType = {
  currentOffers: Offer[];
  lastFetchedOffers: Offer[];
  favoriteOffers: Offer[];
  isDoneFetchingFavoriteOffers: boolean;
  city: CityToOffer;
  offersSortingType: OffersSortingType;
  isDoneFetchingOffers: boolean;
  authStatus: AuthStatus;
  userData: UserData | null;
  offerComments: OfferComment[];
  isDoneFetchingOfferComments: boolean;
  currentClosestOffers: Offer[];
  isDoneFetchingClosestOffers: boolean;
  currentOffer: OfferDetailed | null;
  isDoneFetchingCurrentOffer: boolean;
}

const initialState: StateType = {
  currentOffers: [],
  lastFetchedOffers: [],
  favoriteOffers: [],
  isDoneFetchingFavoriteOffers: false,
  city: CityToOffer.Paris,
  offersSortingType: OffersSortingType.PopularityDescending,
  authStatus: AuthStatus.Unknown,
  isDoneFetchingOffers: false,
  userData: null,
  offerComments: [],
  isDoneFetchingOfferComments: false,
  currentClosestOffers: [],
  isDoneFetchingClosestOffers: false,
  currentOffer: null,
  isDoneFetchingCurrentOffer: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityToOffer, (state: StateType, action: { payload: CityToOffer }) => {
      state.city = action.payload;
    })
    .addCase(setCurrentOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.currentOffers = action.payload;
    })
    .addCase(setIsDoneFetchingOffers, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingOffers = action.payload;
    })
    .addCase(setFavoriteOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setIsDoneFetchingFavoriteOffers, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingFavoriteOffers = action.payload;
    })
    .addCase(setFetchedOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.lastFetchedOffers = action.payload;
    })
    .addCase(setOffersSortingType, (state: StateType, action: { payload: OffersSortingType}) => {
      state.offersSortingType = action.payload;
    })
    .addCase(requireAuthorization, (state: StateType, action: { payload: AuthStatus }) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserData, (state: StateType, action: { payload: UserData | null }) => {
      state.userData = action.payload;
    })
    .addCase(setOfferComments, (state: StateType, action: { payload: OfferComment[] }) => {
      state.offerComments = action.payload;
    })
    .addCase(setIsDoneFetchingOfferComments, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingOfferComments = action.payload;
    })
    .addCase(setCurrentClosestOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.currentClosestOffers = action.payload;
    })
    .addCase(setIsDoneFetchingClosestOffers, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingClosestOffers = action.payload;
    })
    .addCase(setCurrentOffer, (state: StateType, action: { payload: OfferDetailed | null }) => {
      state.currentOffer = action.payload;
    })
    .addCase(setIsDoneFetchingCurrentOffer, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingCurrentOffer = action.payload;
    });
});

export {reducer};
