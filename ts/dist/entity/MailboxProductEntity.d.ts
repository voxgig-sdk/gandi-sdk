import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { MailboxProduct, MailboxProductListMatch, MailboxProductCreateData } from '../GandiTypes';
declare class MailboxProductEntity extends GandiEntityBase<MailboxProduct> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxProductEntity): MailboxProductEntity;
    list(this: any, reqmatch?: MailboxProductListMatch, ctrl?: Control): Promise<MailboxProductEntity[]>;
    create(this: any, reqdata?: MailboxProductCreateData, ctrl?: Control): Promise<MailboxProductEntity>;
}
export { MailboxProductEntity };
