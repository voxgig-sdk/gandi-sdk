import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { EmailMigration, EmailMigrationLoadMatch, EmailMigrationCreateData } from '../GandiTypes';
declare class EmailMigrationEntity extends GandiEntityBase<EmailMigration> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailMigrationEntity): EmailMigrationEntity;
    load(this: any, reqmatch?: EmailMigrationLoadMatch, ctrl?: Control): Promise<EmailMigrationEntity>;
    create(this: any, reqdata?: EmailMigrationCreateData, ctrl?: Control): Promise<EmailMigrationEntity>;
}
export { EmailMigrationEntity };
