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
	Favorite = 'FAVORITE'
}

export enum CityToOffer {
	Paris = 'Paris',
	Cologne = 'Cologne',
	Brussels = 'Brussels',
	Amsterdam = 'Amsterdam',
	Hamburg = 'Hamburg',
	Dusseldorf = 'Dusseldorf'
}

export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
