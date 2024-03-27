export const offersCount = 5;

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
