import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Email, EmailLoadMatch, EmailListMatch, EmailCreateData, EmailUpdateData, EmailPatchData, EmailRemoveMatch } from '../GandiTypes';
declare class EmailEntity extends GandiEntityBase<Email> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    load(this: any, reqmatch?: EmailLoadMatch, ctrl?: Control): Promise<EmailEntity>;
    list(this: any, reqmatch?: EmailListMatch, ctrl?: Control): Promise<EmailEntity[]>;
    create(this: any, reqdata?: EmailCreateData, ctrl?: Control): Promise<EmailEntity>;
    update(this: any, reqdata?: EmailUpdateData, ctrl?: Control): Promise<EmailEntity>;
    patch(this: any, reqdata?: EmailPatchData, ctrl?: Control): Promise<EmailEntity>;
    remove(this: any, reqmatch?: EmailRemoveMatch, ctrl?: Control): Promise<EmailEntity>;
}
export { EmailEntity };
