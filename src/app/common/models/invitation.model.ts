import { BaseModel } from './base.model';

export class InvitationModel extends BaseModel {
  id?: string;
  invitationKey: string;
  plus1Able: boolean;
}
