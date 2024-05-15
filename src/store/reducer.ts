import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus, CityToOffer, OffersSortingType } from '../const';
import { Offer } from '../types/offer';
import { setCityToOffer, setIsDoneFetchingOffers, setCurrentOffers, setOffersSortingType, setFetchedOffers, requireAuthorization, setFavoriteOffers, setUserData } from './action';
import { UserData } from '../types/user-data';

type StateType = {
  currentOffers: Offer[];
  lastFetchedOffers: Offer[];
  favoriteOffers: Offer[];
  city: CityToOffer;
  offersSortingType: OffersSortingType;
  isDoneFetchingOffers: boolean;
  authStatus: AuthStatus;
  userData: UserData | null;
}

const initialState: StateType = {
  currentOffers: [],
  lastFetchedOffers: [],
  favoriteOffers: [],
  city: CityToOffer.Paris,
  offersSortingType: OffersSortingType.PopularityDescending,
  authStatus: AuthStatus.Unknown,
  isDoneFetchingOffers: false,
  userData: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityToOffer, (state: StateType, action: { payload: CityToOffer }) => {
      state.city = action.payload;
    })
    .addCase(setCurrentOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.currentOffers = action.payload;
    })
    .addCase(setFavoriteOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setFetchedOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.lastFetchedOffers = action.payload;
    })
    .addCase(setOffersSortingType, (state: StateType, action: { payload: OffersSortingType}) => {
      state.offersSortingType = action.payload;
    })
    .addCase(setIsDoneFetchingOffers, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingOffers = action.payload;
    })
    .addCase(requireAuthorization, (state: StateType, action: { payload: AuthStatus }) => {
      state.authStatus = action.payload;
    })
    .addCase(setUserData, (state: StateType, action: { payload: UserData | null }) => {
      state.userData = action.payload;
    });
});

export {reducer};
