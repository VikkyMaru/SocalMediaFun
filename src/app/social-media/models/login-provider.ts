import { Observable } from "rxjs/Observable";
import { SocialUser } from "./user";

export interface LoginProvider {
  initialize(): Observable<SocialUser>;
  signIn(): Observable<SocialUser>;
  signOut(): Observable<any>;
}

