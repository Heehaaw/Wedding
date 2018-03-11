import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { BaseModel } from '../models/base.model';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/toPromise';

export abstract class FirestoreService<T extends BaseModel> {

  protected constructor(protected collectionPath: string, private afs: AngularFirestore) {
  }

  private getCollection = (fn?: QueryFn) =>
    this.afs.collection<T>(this.collectionPath, fn || (ref => ref.orderBy('timestamp', 'desc')));

  public all = () => this.getCollection().valueChanges();

  public find = (fn: QueryFn): Observable<T[]> => this.getCollection(fn).valueChanges();

  public getById = (id: string): Observable<T> => this.getCollection().doc<T>(id).valueChanges();

  public async add(model: T) {
    model.timestamp = new Date().getTime();
    let ref = await this.getCollection().add(model);
    model.id = ref.id;
    return this.update(model);
  }

  public update = (model: T): Promise<void> => this.getCollection().doc(model.id).update(model);

  public delete = (model: T): Promise<void> => this.getCollection().doc(model.id).delete();
}
