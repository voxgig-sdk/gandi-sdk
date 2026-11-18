import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { EmailForward, EmailForwardListMatch, EmailForwardCreateData, EmailForwardUpdateData, EmailForwardRemoveMatch } from '../GandiTypes';
declare class EmailForwardEntity extends GandiEntityBase<EmailForward> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailForwardEntity): EmailForwardEntity;
    list(this: any, reqmatch?: EmailForwardListMatch, ctrl?: Control): Promise<EmailForwardEntity[]>;
    create(this: any, reqdata?: EmailForwardCreateData, ctrl?: Control): Promise<EmailForwardEntity>;
    update(this: any, reqdata?: EmailForwardUpdateData, ctrl?: Control): Promise<EmailForwardEntity>;
    remove(this: any, reqmatch?: EmailForwardRemoveMatch, ctrl?: Control): Promise<EmailForwardEntity>;
}
export { EmailForwardEntity };
