import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { SocialUser } from "../models";
import { BaseLoginProvider } from "../models/base-login-provider";


export class InstagramLoginProvider  extends BaseLoginProvider {
    public static readonly PROVIDER_ID = "instagram";
    private _client_id = "2adadf56c61d415e8d34e934123a4af5";
    private _redirect_uri = environment.redirectUri;
    // tslint:disable-next-line:max-line-length
    private _instagramApiUrl = `https://api.instagram.com/oauth/authorize/?client_id=${this._client_id}&redirect_uri=${this._redirect_uri}&response_type=token`;


    constructor(private _httpClient: HttpClient) {
        super();
    }
    initialize(): Observable<SocialUser> {
        throw new Error("Method not implemented.");
    }

    signOut(): Observable<any> {
        throw new Error("Method not implemented.");
    }

    signIn(): Observable<SocialUser> {
        return new Observable(observer => {
            this.signInInternal((response: any) => {
                console.log(response);
            });
        });
    }

    public signInInternal(response: any): Observable<any> {
        return this._httpClient.post<any>(this._instagramApiUrl, {}); // we're getting the html here
    }


}
