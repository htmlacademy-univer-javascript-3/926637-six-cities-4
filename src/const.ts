import { Location } from './types/location';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum OfferCardType {
  Main = 'MAIN',
  Favorite = 'FAVORITE',
  Offer = 'OFFER'
}

export enum CityToOffer {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum OffersSortingType {
  PopularityDescending = 'Popular',
  PriceDescending = 'Price: high to low',
  PriceAscending = 'Price: low to high',
  RatingDescending = 'Top rated first'
}

export const CityToCenterLocationMap: Record<CityToOffer, Location> = {
  [CityToOffer.Amsterdam]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 12
  },
  [CityToOffer.Cologne]: {
    'latitude': 50.9375,
    'longitude': 6.9603,
    'zoom': 12
  },
  [CityToOffer.Brussels]: {
    'latitude': 50.8503,
    'longitude': 4.3517,
    'zoom': 12
  },
  [CityToOffer.Paris]: {
    'latitude': 48.8566,
    'longitude': 2.3522,
    'zoom': 12
  },
  [CityToOffer.Hamburg]: {
    'latitude': 53.5511,
    'longitude': 9.9937,
    'zoom': 12
  },
  [CityToOffer.Dusseldorf]: {
    'latitude': 51.2277,
    'longitude': 6.7735,
    'zoom': 12
  },
};

export const MAX_OFFER_IMAGES_COUNT = 6;
export const MAX_NEWEST_REVIEWS_COUNT = 10;
export const MAX_NUMBER_OF_SUGGESIONS = 3;
