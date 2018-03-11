import { Injectable } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { GuestModel } from '../../common/models/guest.model';

@Injectable()
export class GuestService extends FirestoreService<GuestModel> {

  constructor(afs: AngularFirestore) {
    super('guests', afs);
  }

  public findByEmail = (email) =>
    this.find(ref => ref.where('email', '==', email)).map(g => g && g.length && g[0] || null);
}
