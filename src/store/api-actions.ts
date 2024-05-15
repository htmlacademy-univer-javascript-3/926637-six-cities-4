import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { setIsDoneFetchingOffers, setCurrentOffers, setFetchedOffers, requireAuthorization, redirectToRoute, setFavoriteOffers, setUserData } from './action';
import {APIRoute, AppRoute, AuthStatus} from '../const';
import { Offer, OfferDetailed } from '../types/offer.js';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { dropToken, saveToken } from '../services/token.js';
import App from '../components/app/app.js';

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

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsDoneFetchingOffers(false));
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(setFavoriteOffers(data));
    dispatch(setIsDoneFetchingOffers(true));
  },
);

export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuthorization',
  async (_arg, {dispatch, getState}) => {
    const state = getState();
    if (state.authStatus != AuthStatus.Auth){
      dispatch(redirectToRoute(AppRoute.Login));
    }
  },
);

export const setFavoriteOffer = createAsyncThunk<void, {offerId: string, isFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'setFavoriteOffer',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(checkAuthorization());
    const url = `${APIRoute.Favorites}/${_arg.offerId}/${(_arg.isFavorite) ? "1" : "0"}`;
    console.log(_arg.offerId, url);
    await api.post<OfferDetailed>(url);
    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    console.log(email, password);
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(setUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setUserData(null));
    dropToken();
  },
);
