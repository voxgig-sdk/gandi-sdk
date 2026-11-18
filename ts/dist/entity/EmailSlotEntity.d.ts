import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { EmailSlot, EmailSlotLoadMatch, EmailSlotListMatch, EmailSlotCreateData, EmailSlotRemoveMatch } from '../GandiTypes';
declare class EmailSlotEntity extends GandiEntityBase<EmailSlot> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailSlotEntity): EmailSlotEntity;
    load(this: any, reqmatch?: EmailSlotLoadMatch, ctrl?: Control): Promise<EmailSlotEntity>;
    list(this: any, reqmatch?: EmailSlotListMatch, ctrl?: Control): Promise<EmailSlotEntity[]>;
    create(this: any, reqdata?: EmailSlotCreateData, ctrl?: Control): Promise<EmailSlotEntity>;
    remove(this: any, reqmatch?: EmailSlotRemoveMatch, ctrl?: Control): Promise<EmailSlotEntity>;
}
export { EmailSlotEntity };
