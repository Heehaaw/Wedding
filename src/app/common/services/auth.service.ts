import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { SpinnerService } from '../spinner-module/spinner.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public user$: Observable<firebase.User>;
  public isLoggdIn$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth,
              private spinner: SpinnerService,
              private router: Router) {

    this.user$ = this.afAuth.authState;
    this.isLoggdIn$ = this.user$.map(u => !!u);
    this.isAdmin$ = this.user$.map(u => u && (u.email === 'janek.milota@gmail.com' || u.email === 'verkakola@gmail.com'));

    this.afAuth.auth.getRedirectResult()
      .catch(err => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          if (err.credential.providerId === 'facebook.com') {
            return this.loginGoogle();
          }
          else if (err.credential.providerId === 'google') {
            return this.loginFacebook();
          }
        }
        return Promise.reject(err);
      })
      .then(() => this.spinner.stop(), () => this.spinner.stop());
  }

  public loginGoogle = () => this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  public loginFacebook = () => this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());

  public logout = () => this.afAuth.auth.signOut().then(() => this.router.navigateByUrl('/'));
}
