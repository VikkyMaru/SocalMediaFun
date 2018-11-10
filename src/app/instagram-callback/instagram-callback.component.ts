import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";


@Component({
  selector: "app-instagram-callback",
  templateUrl: "./instagram-callback.component.html",
  styleUrls: ["./instagram-callback.component.css"]
})
export class InstagramCallbackComponent implements OnInit {
    Token: string;

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _httpClient: HttpClient) {
    this._activatedRoute.fragment
    .pipe(map(fragment => fragment)).
    subscribe(fragment => {
       // TODO: Create regex to check the token value
        if (fragment) {
            console.log(fragment);
            this.Token = fragment.split("=")[1];
            this.getUserData().subscribe(result => {
                console.log("insta username:" + result.data.username);
                this.router.navigate([""]);
            });

        }
    });
  }

  ngOnInit() {
    this._activatedRoute.queryParamMap.pipe(map(params => {
        if (params && params["access_token"]) {
            let testQueryParamVal = params["access_token"];
            console.log(testQueryParamVal);
         }
    }));
  }

  getUserData(): Observable<any> {
    const uri = `https://api.instagram.com/v1/users/self/?access_token=${this.Token}`;
    return this._httpClient.get<any>(uri);
  }
}
