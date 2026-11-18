import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Mailbox, MailboxLoadMatch, MailboxListMatch, MailboxCreateData, MailboxUpdateData, MailboxRemoveMatch } from '../GandiTypes';
declare class MailboxEntity extends GandiEntityBase<Mailbox> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxEntity): MailboxEntity;
    load(this: any, reqmatch?: MailboxLoadMatch, ctrl?: Control): Promise<MailboxEntity>;
    list(this: any, reqmatch?: MailboxListMatch, ctrl?: Control): Promise<MailboxEntity[]>;
    create(this: any, reqdata?: MailboxCreateData, ctrl?: Control): Promise<MailboxEntity>;
    update(this: any, reqdata?: MailboxUpdateData, ctrl?: Control): Promise<MailboxEntity>;
    remove(this: any, reqmatch?: MailboxRemoveMatch, ctrl?: Control): Promise<MailboxEntity>;
}
export { MailboxEntity };
