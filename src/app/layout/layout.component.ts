import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../common/spinner-module/spinner.service';
import { InvitationService } from '../common/services/invitation.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('closeButton') private closeButton: ElementRef;

  public loggedIn$: Observable<boolean>;
  public admin$: Observable<boolean>;
  public userName$: Observable<string>;

  public invitationKey: string = '';
  public invitationKeyError: string = null;

  constructor(private authService: AuthService,
              private spinner: SpinnerService,
              private invitationService: InvitationService) {

    this.loggedIn$ = this.authService.isLoggdIn$;
    this.admin$ = this.authService.isAdmin$;
    this.userName$ = this.authService.user$.map(u => u && u.displayName || '');

    this.invitationService.getStoredInvitation().subscribe(i => this.invitationKey = i.invitationKey);
  }

  ngOnInit() {
  }

  public loginGoogle() {
    this.login(this.authService.loginGoogle);
  }

  public async loginFacebook() {
    this.login(this.authService.loginFacebook);
  }

  private login(loginFn: () => Promise<void>) {
    this.spinner.start();
    this.invitationService.getByInvitationKey(this.invitationKey)
      .subscribe(async invitations => {
          if (!invitations || !invitations.length) {
            this.invitationKeyError = 'Wrong invitation key!';
          }
          else {
            this.invitationKeyError = null;
            await loginFn();
            this.closeButton.nativeElement.click();
          }
          this.spinner.stop();
        }
      );
  }

  public logout = () => this.authService.logout();
}
