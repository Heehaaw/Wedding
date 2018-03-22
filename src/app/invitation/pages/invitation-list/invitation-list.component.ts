import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../../common/spinner-module/spinner.service';
import { InvitationModel } from '../../../common/models/invitation.model';
import { InvitationService } from '../../../common/services/invitation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent implements OnInit {

  invitations$: Observable<InvitationModel[]>;

  constructor(private invitationService: InvitationService, private spinner: SpinnerService, private toastr: ToastrService) {
    this.invitations$ = this.invitationService.all();
  }

  ngOnInit() {
  }

  async onUpdateInvitation(invitation: InvitationModel) {
    this.spinner.start();
    try {
      await this.invitationService.update(invitation).catch();
    }
    catch {
      this.toastr.error('Něco se pokazilo, zkuste to prosím později...');
      return;
    }
    finally {
      this.spinner.stop();
    }
    this.toastr.success('Pozvánka uložena!');
  }

  async onDeleteInvitation(invitation: InvitationModel) {
    this.spinner.start();
    try {
      await this.invitationService.delete(invitation);
    }
    catch {
      this.toastr.error('Něco se pokazilo, zkuste to prosím později...');
      return;
    }
    finally {
      this.spinner.stop();
    }
    this.toastr.success('Pozvánka smazána!');
  }

  async onNewInvitation() {
    this.spinner.start();
    try {
      await this.invitationService.add({ invitationKey: null, plus1Able: false });
    }
    catch {
      this.toastr.error('Něco se pokazilo, zkuste to prosím později...');
      return;
    }
    finally {
      this.spinner.stop();
    }
    this.toastr.success('Pozvánka vytvořena!');
  }
}
