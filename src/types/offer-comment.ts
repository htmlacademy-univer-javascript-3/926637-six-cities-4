import { User } from './user';

export type OfferComment =
{
	id: string;
	date: string;
	user: User;
	comment: string;
	rating: number;
}
