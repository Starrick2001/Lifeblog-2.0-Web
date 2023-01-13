export const API_URL = process.env.REACT_APP_API;

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export interface IUser {
	id: string;
	email: string;
	name: string;
	familyName: string;
	givenName: string;
	picture: string;
}