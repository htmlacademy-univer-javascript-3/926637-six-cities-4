
import {createAction} from '@reduxjs/toolkit';
import { CityToOffer } from '../const';

export const setCityToOffer = createAction<CityToOffer>('setCityToOffer');

export const getOffers = createAction('getOffers');
