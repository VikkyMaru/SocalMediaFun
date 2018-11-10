import { Component, OnInit } from "@angular/core";
import { AuthServiceConfig } from "./social-media/auth.service";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from "./social-media/providers";

@Component({
  selector: "app-root",
//   template: "<router-outlet></router-outlet>",
   templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
    title = "app";
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }


constructor() {}
}




export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("1205973196207622")
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("326632931734-en6jqnqmli38iqq37ej9ua7lcjnnttj5.apps.googleusercontent.com")
          },
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("77zypzsuqkslwp")
          }
        ]
    );
    return config;
}
