import { finalize } from 'rxjs';
declare var FB: any;
import { FacebookService } from '../services/facebook.service';
import { environment } from '../environments/environment';

export function appInitializer(facebookService: FacebookService) {
    return () => new Promise(resolve => {
        (window as any).fbAsyncInit = function() {
            FB.init({
                appId: environment.facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v16.0'
            });

            // auto login to the app if already logged in with facebook
            FB.getLoginStatus(({ authResponse }: any) => {
                if (authResponse) {
                    facebookService.loginFacebook().subscribe(
                        fbData => {
                            console.log('Facebook login data:', fbData);
                        },
                        error => {
                            console.error('Facebook login error:', error);
                        }
                    );
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js: any;
            var fjs: any = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}