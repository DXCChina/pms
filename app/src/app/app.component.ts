import {Component, ViewContainerRef} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/Rx'
import {getHttpHeadersOrInit, HttpInterceptorService} from "ng-http-interceptor";

import {GlobalState} from "./global.state";
import {BaImageLoaderService, BaThemePreloader, BaThemeSpinner} from "./theme/services";
import {BaThemeConfig} from "./theme/theme.config";


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;
  refreshUrl: string = '/auth/token';

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private httpInterceptor: HttpInterceptorService,
              private router: Router,
              private http: Http) {
    this.refreshUrl = this._state.baseURL + this.refreshUrl;
    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    httpInterceptor.request().addInterceptor((data, method) => {
      // console.log(method, data);
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const headers = getHttpHeadersOrInit(data, method);
        headers.set(this._state.jwtHeader, accessToken);
        return data;
      } else {
        this.router.navigate(['/login']);
        return null;
      }
    });

    httpInterceptor.response().addInterceptor((res, method) => {

      return res.map(r => {
        // todo: status code = -6 refresh token
        if ((JSON.parse(r["_body"])).code === -6) {
          this.http.get(this.refreshUrl).subscribe(r => {
              localStorage.setItem("accessToken", (JSON.parse(r["_body"])).data.accessToken);
              return r;
            }
          );
        }
        return r
      }).do(r => {
        // console.log(method, r)
      })
        .retry(1);
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('/assets/img/sky-bg.jpg'));
  }

}
