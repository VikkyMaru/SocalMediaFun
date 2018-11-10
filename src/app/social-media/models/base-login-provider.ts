import { Observable } from "rxjs/Observable";
import { LoginProvider } from "./login-provider";
import { LoginProviderClass, SocialUser } from "./user";

export abstract class BaseLoginProvider implements LoginProvider {
  constructor() {}


  abstract initialize(): Observable<SocialUser>;
  abstract signIn(): Observable<SocialUser>;
  abstract signOut(): Observable<any>;

  loadScript(obj: LoginProviderClass, onload: any): void {
    if (document.getElementById(obj.name)) {
        return;
    }
    let signInJS = document.createElement("script");
    signInJS.async = true;
    signInJS.src = obj.url;
    signInJS.onload = onload;
    if (obj.name === "linkedin") {
      signInJS.async = false;
      let apiKey = ("api_key: " + obj.id).replace("\"", "");
      signInJS.text = apiKey;
    }
    document.head.appendChild(signInJS);
  }
}
