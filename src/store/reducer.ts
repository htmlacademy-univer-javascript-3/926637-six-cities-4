import { createReducer } from '@reduxjs/toolkit';
import { CityToOffer } from '../const';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import { setCityToOffer, getOffers } from './action';

type StateType = {
  offers: Offer[];
  city: CityToOffer;
}

const initialState: StateType = {
  offers: offers,
  city: CityToOffer.Paris
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityToOffer, (state: StateType, action: { payload: CityToOffer }) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state: StateType) => {
      state.offers = offers.filter((offer) => offer.city.name === state.city.toString());
    });
});

export {reducer};
