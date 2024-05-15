import { createReducer } from '@reduxjs/toolkit';
import { CityToOffer, OffersSortingType } from '../const';
import { Offer } from '../types/offer';
import { setCityToOffer, setIsDoneFetchingOffers, setCurrentOffers, setOffersSortingType, setFetchedOffers } from './action';

type StateType = {
  currentOffers: Offer[];
  lastFetchedOffers: Offer[];
  city: CityToOffer;
  offersSortingType: OffersSortingType;
  isDoneFetchingOffers: boolean;
}

const initialState: StateType = {
  currentOffers: [],
  lastFetchedOffers: [],
  city: CityToOffer.Paris,
  offersSortingType: OffersSortingType.PopularityDescending,
  isDoneFetchingOffers: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityToOffer, (state: StateType, action: { payload: CityToOffer }) => {
      state.city = action.payload;
    })
    .addCase(setCurrentOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.currentOffers = action.payload;
    })
    .addCase(setFetchedOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.lastFetchedOffers = action.payload;
    })
    .addCase(setOffersSortingType, (state: StateType, action: { payload: OffersSortingType}) => {
      state.offersSortingType = action.payload;
    })
    .addCase(setIsDoneFetchingOffers, (state: StateType, action: { payload: boolean }) => {
      state.isDoneFetchingOffers = action.payload;
    });
});

export {reducer};
