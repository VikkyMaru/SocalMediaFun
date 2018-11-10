import { Observable } from "rxjs/Observable";
import { BaseLoginProvider } from "../models/base-login-provider";
import { LinkedInResponse, LoginProviderClass, SocialUser } from "../models/user";

declare let IN: any;

export class LinkedinLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = "linkedin";
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = "linkedin";
    this.loginProviderObj.url = "https://platform.linkedin.com/in.js";
  }

  initialize(): Observable<SocialUser> {
    return new Observable(observer => {
      this.loadScript(this.loginProviderObj, () => {
          IN.init({
            api_key: this.clientId,
            authorize: true,
            onLoad: this.onLinkedInLoad()
          });

          IN.Event.on(IN, "auth", () => {
            if (IN.User.isAuthorized()) {
              IN.API.Raw(
                "/people/~:(id,first-name,last-name,email-address,picture-url)"
              ).result( (res: LinkedInResponse) => {
                  observer.next(this.drawUser(res));
                  observer.complete();
              });
            }
          });

        });
    });
  }

  onLinkedInLoad() {
    IN.Event.on(IN, "systemReady", () => {
      IN.User.refresh();
    });
  }

  drawUser(response: LinkedInResponse): SocialUser {
    let user: SocialUser = new SocialUser();
    user.id = response.emailAddress;
    user.name = response.firstName + " " + response.lastName;
    user.email = response.emailAddress;
    user.image = response.pictureUrl;
    user.token = IN.ENV.auth.oauth_token;
    return user;
  }

  signIn(): Observable<SocialUser> {
    return new Observable(observer => {
      IN.User.authorize( () => {
        IN.API.Raw(
            "/people/~:(id,first-name,last-name,formatted-name,email-address,picture-url)").result(
                // "/people/~").result(
                (res: LinkedInResponse) => {
                    observer.next(this.drawUser(res));
                    observer.complete();
            });
      });
    });
  }

  signOut(): Observable<any> {
    return new Observable(observer => {
      IN.User.logout((response: any) => {
        observer.next();
        observer.complete();
      }, (err: any) => {
        Observable.throw(err);
      });
    });
  }

}
