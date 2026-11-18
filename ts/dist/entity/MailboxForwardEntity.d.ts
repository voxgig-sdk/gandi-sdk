import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { MailboxForward, MailboxForwardListMatch, MailboxForwardCreateData, MailboxForwardUpdateData, MailboxForwardRemoveMatch } from '../GandiTypes';
declare class MailboxForwardEntity extends GandiEntityBase<MailboxForward> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxForwardEntity): MailboxForwardEntity;
    list(this: any, reqmatch?: MailboxForwardListMatch, ctrl?: Control): Promise<MailboxForwardEntity[]>;
    create(this: any, reqdata?: MailboxForwardCreateData, ctrl?: Control): Promise<MailboxForwardEntity>;
    update(this: any, reqdata?: MailboxForwardUpdateData, ctrl?: Control): Promise<MailboxForwardEntity>;
    remove(this: any, reqmatch?: MailboxForwardRemoveMatch, ctrl?: Control): Promise<MailboxForwardEntity>;
}
export { MailboxForwardEntity };
