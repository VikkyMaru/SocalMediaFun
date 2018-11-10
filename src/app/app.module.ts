import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent, getAuthServiceConfigs } from "./app.component";
import { InstagramCallbackComponent } from "./instagram-callback/instagram-callback.component";
import { SampleComponent } from "./sample/sample.component";
import { AuthService, AuthServiceConfig } from "./social-media/auth.service";
import { SignInComponent } from "./social-media/sign-in/sign-in.component";
import { TwitterCallbackComponent } from "./twitter-callback/twitter-callback.component";
import { TwitterService } from "./twitter.service";



const appRoutes: Routes = [
    {
        path: "",
        component: SampleComponent,
        pathMatch: "full"
    },
    {
        path: "callback",
        component: InstagramCallbackComponent
    },
    {
        path: "twitter-callback",
        component: TwitterCallbackComponent
    }
  ];

@NgModule({
   declarations: [
      AppComponent,
      SignInComponent,
      InstagramCallbackComponent,
      SampleComponent,
      TwitterCallbackComponent
   ],
   imports: [
    RouterModule.forRoot(
        appRoutes,
        {
            enableTracing: false
        }
      ),
      BrowserModule,
      HttpClientModule,
      HttpModule
   ],
   providers: [
      TwitterService,
      AuthService,
      {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


