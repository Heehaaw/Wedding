import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.loggedIn$ = this.authService.isLoggdIn$;
  }

  ngOnInit() {
  }

}
