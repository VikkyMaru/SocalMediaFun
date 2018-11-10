import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-twitter-callback",
  templateUrl: "./twitter-callback.component.html",
  styleUrls: ["./twitter-callback.component.css"]
})
export class TwitterCallbackComponent implements OnInit {

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit() {
      debugger
  }

  // TODO: Implement denied flow.

}
