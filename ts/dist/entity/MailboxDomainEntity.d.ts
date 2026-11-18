import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { MailboxDomain, MailboxDomainLoadMatch, MailboxDomainListMatch, MailboxDomainCreateData } from '../GandiTypes';
declare class MailboxDomainEntity extends GandiEntityBase<MailboxDomain> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxDomainEntity): MailboxDomainEntity;
    load(this: any, reqmatch?: MailboxDomainLoadMatch, ctrl?: Control): Promise<MailboxDomainEntity>;
    list(this: any, reqmatch?: MailboxDomainListMatch, ctrl?: Control): Promise<MailboxDomainEntity[]>;
    create(this: any, reqdata?: MailboxDomainCreateData, ctrl?: Control): Promise<MailboxDomainEntity>;
}
export { MailboxDomainEntity };
