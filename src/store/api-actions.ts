import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { setIsDoneFetchingOffers, setCurrentOffers, setFetchedOffers } from './action';
import {APIRoute} from '../const';
import { Offer } from '../types/offer.js';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, getState, extra: api}) => {
	dispatch(setIsDoneFetchingOffers(false));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
	const state = getState();
	const fetchedOffers = data.filter((offer) => offer.city.name === state.city.toString());
    dispatch(setCurrentOffers(fetchedOffers));
	dispatch(setFetchedOffers(fetchedOffers));
	dispatch(setIsDoneFetchingOffers(true));
  },
);
