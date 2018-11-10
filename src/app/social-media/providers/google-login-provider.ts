import { Observable } from "rxjs/Observable";
import { BaseLoginProvider } from "../models/base-login-provider";
import { LoginProviderClass, SocialUser } from "../models/user";

declare let gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = "google";
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();
  private auth2: any;

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = "google";
    this.loginProviderObj.url = "https://apis.google.com/js/platform.js";
  }

  initialize(): Observable<SocialUser> {
    return new Observable(observer => {
      this.loadScript(this.loginProviderObj, () => {
          gapi.load("auth2", () => {
            this.auth2 = gapi.auth2.init({
              client_id: this.clientId,
              scope: "email"
            });

            this.auth2.then(() => {
              if (this.auth2.isSignedIn.get()) {
                observer.next(this.drawUser());
                observer.complete();
              }
            });
          });
      });
    });
  }

  drawUser(): SocialUser {
    let user: SocialUser = new SocialUser();
    let profile = this.auth2.currentUser.get().getBasicProfile();
    let authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
    user.id = profile.getId();
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.image = profile.getImageUrl();
    user.token = authResponseObj.access_token;
    user.idToken = authResponseObj.id_token;
    return user;
  }

  signIn(): Observable<SocialUser> {
    return new Observable(observer => {
      let promise = this.auth2.signIn();
      promise.then(() => {
        observer.next(this.drawUser());
        observer.complete();
      });
    });
  }

  signOut(): Observable<void> {
    return new Observable(observer => {
      this.auth2.signOut().then((err: any) => {
        if (err) {
         // reject(err);
        // throwError(err);
        Observable.throw(err);
        } else {
            observer.next();
            observer.complete();
        }
      });
    });
  }

}
