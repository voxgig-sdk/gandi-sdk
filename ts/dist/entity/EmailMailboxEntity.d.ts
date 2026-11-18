import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { EmailMailbox, EmailMailboxLoadMatch, EmailMailboxListMatch, EmailMailboxCreateData, EmailMailboxUpdateData, EmailMailboxRemoveMatch } from '../GandiTypes';
declare class EmailMailboxEntity extends GandiEntityBase<EmailMailbox> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailMailboxEntity): EmailMailboxEntity;
    load(this: any, reqmatch?: EmailMailboxLoadMatch, ctrl?: Control): Promise<EmailMailboxEntity>;
    list(this: any, reqmatch?: EmailMailboxListMatch, ctrl?: Control): Promise<EmailMailboxEntity[]>;
    create(this: any, reqdata?: EmailMailboxCreateData, ctrl?: Control): Promise<EmailMailboxEntity>;
    update(this: any, reqdata?: EmailMailboxUpdateData, ctrl?: Control): Promise<EmailMailboxEntity>;
    remove(this: any, reqmatch?: EmailMailboxRemoveMatch, ctrl?: Control): Promise<EmailMailboxEntity>;
}
export { EmailMailboxEntity };
