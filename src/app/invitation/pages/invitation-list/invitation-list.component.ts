import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../../common/spinner-module/spinner.service';
import { InvitationModel } from '../../../common/models/invitation.model';
import { InvitationService } from '../../../common/services/invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent implements OnInit {

  invitations$: Observable<InvitationModel[]>;

  constructor(private invitationService: InvitationService, private spinner: SpinnerService) {
    this.invitations$ = this.invitationService.all();
  }

  ngOnInit() {
  }

  async onUpdateInvitation(invitation: InvitationModel) {
    this.spinner.start();
    await this.invitationService.update(invitation);
    this.spinner.stop();
  }

  async onDeleteInvitation(invitation: InvitationModel) {
    this.spinner.start();
    await this.invitationService.delete(invitation);
    this.spinner.stop();
  }

  async onNewInvitation() {
    this.spinner.start();
    await this.invitationService.add({ invitationKey: null, plus1Able: false });
    this.spinner.stop();
  }
}
