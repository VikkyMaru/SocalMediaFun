import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";


const CONSUMER_KEY = environment.oauthConsumerKey;
const CONSUMER_SECRET = environment.oauthConsumerSecret;

@Injectable()
export class TwitterService {

constructor(private _http: HttpClient) { }

static getNonce(numChars): string {
    let st = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
    let l = st.length;
    let result = "";

    for (let i = 0; i < numChars; i++) {
      let randomIndex = Math.floor(Math.random() * l);
      result = result + st.charAt(randomIndex);
    }
    return result;
}

  // any used here is an Object of format {key,value}
  static getSignatureString(arr: Array<any>): string {
    let result = "";
    let l = arr.length;
    for (let i = 0; i < l; i++) {
      console.log(arr[i].key, arr[i].value);
      result += encodeURIComponent(arr[i].key) + "=" + encodeURIComponent(arr[i].value);
      if (i !== l - 1) {
        result += "&";
      }
    }
    return result;
  }

  static getAuthValue(arr: Array<any>): string {
    let result = "OAuth ";
    let l = arr.length;
    for (let i = 0; i < l; i++) {
      result += encodeURIComponent(arr[i].key) + "=\"" + encodeURIComponent(arr[i].value) + "\"";
      if (i !== l - 1) {
        result += ", ";
      }
    }
    return result;
  }

  static handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }

  postAPIData(): Observable<any> {
    return this._http.post("http://localhost:3000/requestTokenTwitter",{});
  }

onSignIn(): Promise<any> {
    let responsePromise: Promise<any> = new Promise((resolve, reject) => {
        setTimeout(() => {
            let response = {};
            response["_body"] = "oauth_token=QCgAPAAAAAAA82DpAAABZu6_N88&oauth_token_secret=QdPi0ikgeDf0OmwpWlHriSQNXofprwOX&oauth_callback_confirmed=true";
            resolve(response);
        }, 1000);
    });
    return responsePromise;

    // TODO: implement server side.
    // let twitterCallbackUrl = "http://localhost:4200/twitter-callback";
    // let url = "https://api.twitter.com/oauth/request_token";
    // let method = "POST";
    // let oauth_consumer_key = CONSUMER_KEY;
    // let oauth_nonce = TwitterService.getNonce(32);
    // let oauth_signature_method = "HMAC-SHA1";
    // let oauth_timestamp = Math.floor(Date.now() / 1000).toString();
    // let oauth_version = "1.0";
    // let parameterString = TwitterService.getSignatureString([
    //   {key: "oauth_callback", value: twitterCallbackUrl},
    //   {key: "oauth_consumer_key", value: oauth_consumer_key},
    //   {key: "oauth_nonce", value: oauth_nonce},
    //   {key: "oauth_signature_method", value: "HMAC-SHA1"},
    //   {key: "oauth_timestamp", value: oauth_timestamp},
    //   {key: "oauth_version", value: "1.0"},
    // ]);


    // let shaKey = encodeURIComponent(CONSUMER_SECRET) + "&"; // Consumer Key Secret
    // let final_string = method + "&" + encodeURIComponent(url) + "&" + encodeURIComponent(parameterString);
    // console.log("Parameter String:", parameterString);
    // console.log("finalString:", final_string);
    // console.log("shakey:", shaKey);
    // let s = CryptoJS.HmacSHA1(final_string, shaKey);
    // let oauth_signature = CryptoJS.enc.Base64.stringify(s);
    // console.log(oauth_signature);
    // let authValue = TwitterService.getAuthValue([
    //   {key: "oauth_callback", value: twitterCallbackUrl},
    //   {key: "oauth_consumer_key", value: oauth_consumer_key},
    //   {key: "oauth_nonce", value: oauth_nonce},
    //   {key: "oauth_signature", value: oauth_signature},
    //   {key: "oauth_signature_method", value: "HMAC-SHA1"},
    //   {key: "oauth_timestamp", value: oauth_timestamp},
    //   {key: "oauth_version", value: "1.0"},
    // ]);

    // let headers = new Headers({"Authorization": authValue});
    // // console.log(authValue,url);
    // // console.log(http);
    // // console.log(oauth_nonce.length);
    // return this._http.post(url, "", new RequestOptions({headers: headers})).toPromise()
    //   .then(response => response)
    //   .catch(TwitterService.handleError);
  }


}

