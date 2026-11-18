import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { MailboxQuota, MailboxQuotaListMatch } from '../GandiTypes';
declare class MailboxQuotaEntity extends GandiEntityBase<MailboxQuota> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxQuotaEntity): MailboxQuotaEntity;
    list(this: any, reqmatch?: MailboxQuotaListMatch, ctrl?: Control): Promise<MailboxQuotaEntity[]>;
}
export { MailboxQuotaEntity };
