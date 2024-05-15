import {UserData} from './user-data.ts';

export type AuthResult = {
  user: UserData | undefined;
  status: AuthResult;
}
