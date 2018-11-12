import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { TwitterService } from "../../twitter.service";
import { AuthService } from "../auth.service";
import { LinkedinLoginProvider } from "../providers";
import { FacebookLoginProvider } from "../providers/facebook-login-provider";
import { GoogleLoginProvider } from "../providers/google-login-provider";
import { InstagramLoginProvider } from "../providers/instagram-login-provider";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent {

    constructor( private socialAuthService: AuthService, private _httpClient: HttpClient, private _twitterService: TwitterService) {}

    private _httpClientOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };

    public socialSignIn(socialPlatform: string) {
      let socialPlatformProvider;
      if (socialPlatform === "facebook") {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === "google") {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === "linkedin") {
        socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === "instagram") {
        socialPlatformProvider = InstagramLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).subscribe(
        (userData) => {
          console.log(socialPlatform + " sign in data : " , userData);
          // Now sign-in with userData
        }
      );
    }

    public socialSignOut() {
        this.socialAuthService.signOut().subscribe(
          () => {
            console.log(" sign out ");
            // Now sign-in with userData
          }
        );
      }


    public signInWithInstagram(): void {
        // tslint:disable-next-line:max-line-length
        window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=2adadf56c61d415e8d34e934123a4af5&redirect_uri=http://localhost:4200/callback&response_type=token";
        // this.getInstagramToken().subscribe(token => {
        //     this.getUserData(token).subscribe(result => {
        //         console.log(result);
        //     });
        // });

    }


    public signWithTwitter(): void {
        this._twitterService.postAPIData().subscribe((response) => {
            console.log("response from post data is ", response);
            window.location.href = "https://api.twitter.com/oauth/authenticate?oauth_token=" + response.oauth_token;
          }, (error) => {
            console.log("error during post is ", error);
          });
        // debugger;
        // let tempStr = "";
        // this._twitterService.onSignIn().then(function (response) {
        //   tempStr = response["_body"];
        //   let a = tempStr.indexOf("&");
        //   let token = tempStr.substr(0, a);
        //   window.location.href = "https://api.twitter.com/oauth/authenticate?" + token;
        // });
    }

}
