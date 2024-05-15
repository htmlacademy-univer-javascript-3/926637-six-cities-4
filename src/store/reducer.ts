import { createReducer } from '@reduxjs/toolkit';
import { CityToOffer, OffersSortingType } from '../const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import { setCityToOffer, fetchOffers, setOffers, setOffersSortingType } from './action';

type StateType = {
  currentOffers: Offer[];
  lastFetchedOffers: Offer[];
  city: CityToOffer;
  offersSortingType: OffersSortingType;
}

const initialState: StateType = {
  currentOffers: offers,
  lastFetchedOffers: offers,
  city: CityToOffer.Paris,
  offersSortingType: OffersSortingType.PopularityDescending
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityToOffer, (state: StateType, action: { payload: CityToOffer }) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers, (state: StateType) => {
      state.currentOffers = offers.filter((offer: Offer) => offer.city.name === state.city.toString());
      state.lastFetchedOffers = state.currentOffers;
    })
    .addCase(setOffers, (state: StateType, action: { payload: Offer[] }) => {
      state.currentOffers = action.payload;
    })
    .addCase(setOffersSortingType, (state: StateType, action: { payload: OffersSortingType}) => {
      state.offersSortingType = action.payload;
    });
});

export {reducer};
