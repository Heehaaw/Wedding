import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from './firestore.service';
import { InvitationModel } from '../models/invitation.model';
import { Observable } from 'rxjs/Observable';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import 'rxjs/add/operator/do';

@Injectable()
export class InvitationService extends FirestoreService<InvitationModel> {

  private invitationStorageKey = 'W.invitation';

  constructor(afs: AngularFirestore, private localStorage: AsyncLocalStorage) {
    super('invitations', afs);
  }

  public getByInvitationKey(key: string) {
    return this.find(ref => ref.where('invitationKey', '==', key))
      .do(invitations => invitations && invitations.length && this.localStorage.setItem(this.invitationStorageKey, invitations[0]).subscribe());

  }

  public getStoredInvitation(): Observable<InvitationModel> {
    return this.localStorage.getItem<InvitationModel>(this.invitationStorageKey);
  }
}
