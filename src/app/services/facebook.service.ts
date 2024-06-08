declare var FB: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Account {
    id: string;
    facebookId: string;
    name: string;
    extraInfo: string;
    token?: string;
}

@Injectable({ providedIn: 'root' })
export class FacebookService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    login() {
        // login with facebook and display user data
        this.loginFacebook().pipe(
            tap(fbData => console.log('Facebook login data:', fbData))
        ).subscribe();
    }

    loginFacebook() {
        // login with facebook and return observable with fb user data on success
        const fbLoginPromise = new Promise<any>(resolve => FB.login(resolve));
        return from(fbLoginPromise).pipe(
            concatMap(({ authResponse }) => {
                if (authResponse) {
                    return new Promise<any>(resolve => {
                        // Adjust the fields parameter to fetch more data
                        FB.api('/me', { fields: 'id,name,email,first_name,last_name,gender,picture' }, resolve);
                    });
                } else {
                    return EMPTY;
                }
            })
        );
    }

    logout() {
        FB.logout();
        this.accountSubject.next(null);
        this.router.navigate(['/login']);
    }

    getAccount() {
        return of(this.accountSubject.value); // Return the current account as observable
    }
    
    updateAccount(params: any) {
        return of({ ...this.accountValue, ...params }).pipe(
            map(account => {
                this.accountSubject.next(account as Account);
                return account;
            })
        );
    }

    deleteAccount() {
        this.logout();
        return EMPTY; // Simulate account deletion
    }
}
