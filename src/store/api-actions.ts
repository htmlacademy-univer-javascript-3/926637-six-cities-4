import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { setIsDoneFetchingOffers, setCurrentOffers, setFetchedOffers, requireAuthorization, redirectToRoute, setFavoriteOffers, setUserData, setOfferComments, setIsDoneFetchingOfferComments, setIsDoneFetchingClosestOffers, setCurrentClosestOffers, setCurrentOffer, setIsDoneFetchingCurrentOffer, setIsDoneFetchingFavoriteOffers } from './action';
import {APIRoute, AppRoute, AuthStatus, MAX_NUMBER_OF_SUGGESIONS} from '../const';
import { Offer, OfferDetailed } from '../types/offer.js';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { dropToken, saveToken } from '../services/token.js';
import { OfferComment } from '../types/offer-comment.js';
import { CommentData } from '../types/comment-data.js';

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
    dispatch(setIsDoneFetchingFavoriteOffers(false));
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(setFavoriteOffers(data));
    dispatch(setIsDoneFetchingFavoriteOffers(true));
  },
);

export const fetchOfferComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferComments',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsDoneFetchingOfferComments(false));
    const url = `${APIRoute.Comments}/${_arg}`;
    const {data} = await api.get<OfferComment[]>(url);
    dispatch(setOfferComments(data));
    dispatch(setIsDoneFetchingOfferComments(true));
  },
);

export const fetchClosestOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchClosestOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setIsDoneFetchingClosestOffers(false));
    const url = `${APIRoute.Offers}/${_arg}/nearby`;
    const {data} = await api.get<Offer[]>(url);
    dispatch(setCurrentClosestOffers(data.slice(0, MAX_NUMBER_OF_SUGGESIONS)));
    dispatch(setIsDoneFetchingClosestOffers(true));
  },
);

export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuthorization',
  (_arg, {dispatch, getState}) => {
    const state = getState();
    if (state.authStatus !== AuthStatus.Auth){
      dispatch(redirectToRoute(AppRoute.Login));
    }
  },
);

export const fetchCurrentOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchCurrentOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setIsDoneFetchingCurrentOffer(false));
    const url = `${APIRoute.Offers}/${offerId}`;
    const {data} = await api.get<OfferDetailed>(url);
    dispatch(setCurrentOffer(data));
    dispatch(setIsDoneFetchingCurrentOffer(true));
    dispatch(fetchOfferComments(offerId));
    dispatch(fetchClosestOffers(offerId));
  },
);

export const setFavoriteOffer = createAsyncThunk<void, {offerId: string; isFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'setFavoriteOffer',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(checkAuthorization());
    const url = `${APIRoute.Favorites}/${_arg.offerId}/${(_arg.isFavorite) ? '1' : '0'}`;
    await api.post<OfferDetailed>(url);
    dispatch(fetchOffers());
    dispatch(fetchClosestOffers(_arg.offerId));
    dispatch(fetchCurrentOffer(_arg.offerId));
    dispatch(fetchFavoriteOffers());
  },
);

export const loginAction = createAsyncThunk<number, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(setUserData(data));
    return status;
  },
);

export const postComment = createAsyncThunk<number, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'postComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(checkAuthorization());
    const {status} = await api.post<OfferComment>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(fetchOfferComments(offerId));
    return status;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setUserData(null));
    dropToken();
  },
);
