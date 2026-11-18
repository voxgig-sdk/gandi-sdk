import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { MailboxSlot, MailboxSlotLoadMatch, MailboxSlotListMatch } from '../GandiTypes';
declare class MailboxSlotEntity extends GandiEntityBase<MailboxSlot> {
    constructor(client: GandiSDK, entopts: any);
    make(this: MailboxSlotEntity): MailboxSlotEntity;
    load(this: any, reqmatch?: MailboxSlotLoadMatch, ctrl?: Control): Promise<MailboxSlotEntity>;
    list(this: any, reqmatch?: MailboxSlotListMatch, ctrl?: Control): Promise<MailboxSlotEntity[]>;
}
export { MailboxSlotEntity };
