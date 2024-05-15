import { Location } from './types/location';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'Unknown'
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
    'zoom': 11
  },
  [CityToOffer.Cologne]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 1
  },
  [CityToOffer.Brussels]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 1
  },
  [CityToOffer.Paris]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 1
  },
  [CityToOffer.Hamburg]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 1
  },
  [CityToOffer.Dusseldorf]: {
    'latitude': 52.37403000,
    'longitude': 4.88969000,
    'zoom': 1
  },
};
