import { Observable } from "rxjs/Observable";
import { BaseLoginProvider } from "../models/base-login-provider";
import { LoginProviderClass, SocialUser } from "../models/user";

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = "facebook";
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();

  constructor(private clientId: string) {
  super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = "facebook";
    this.loginProviderObj.url = "https://connect.facebook.net/en_US/sdk.js";
  }

  static drawUser(response: any): SocialUser {
    let user: SocialUser = new SocialUser();
    user.id = response.id;
    user.name = response.name;
    user.email = response.email;
    user.token = response.token;
    user.image = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
    return user;
  }

  initialize(): Observable<SocialUser> {
    return new Observable(observer => {
      this.loadScript(this.loginProviderObj, () => {
          FB.init({
            appId: this.clientId,
            autoLogAppEvents: true,
            cookie: true,
            xfbml: true,
            version: "v2.10"
          });
          FB.AppEvents.logPageView();

          FB.getLoginStatus(function (response: any) {
            if (response.status === "connected") {
              const accessToken = FB.getAuthResponse()["accessToken"];
              FB.api("/me?fields=name,email,picture", (res: any) => {
                observer.next(FacebookLoginProvider.drawUser(Object.assign({}, {token: accessToken}, res)));
                observer.complete();
              });
            }
          });
        });
    });
  }



  signIn(): Observable<SocialUser> {
    return new Observable(observer => {
      FB.login((response: any) => {
        if (response.authResponse) {
          const accessToken = FB.getAuthResponse()["accessToken"];
          FB.api("/me?fields=name,email,picture", (res: any) => {
            observer.next(FacebookLoginProvider.drawUser(Object.assign({}, {token: accessToken}, res)));
            observer.complete();
          });
        }
      }, { scope: "email,public_profile" });
    });
  }

  signOut(): Observable<any> {
    return new Observable(observer => {
      FB.logout((response: any) => {
        observer.next();
        observer.complete();
        console.log("facebook sign out");
      });
    });
  }

}
