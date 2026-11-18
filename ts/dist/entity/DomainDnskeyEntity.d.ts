import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainDnskey, DomainDnskeyListMatch, DomainDnskeyCreateData, DomainDnskeyUpdateData, DomainDnskeyRemoveMatch } from '../GandiTypes';
declare class DomainDnskeyEntity extends GandiEntityBase<DomainDnskey> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainDnskeyEntity): DomainDnskeyEntity;
    list(this: any, reqmatch?: DomainDnskeyListMatch, ctrl?: Control): Promise<DomainDnskeyEntity[]>;
    create(this: any, reqdata?: DomainDnskeyCreateData, ctrl?: Control): Promise<DomainDnskeyEntity>;
    update(this: any, reqdata?: DomainDnskeyUpdateData, ctrl?: Control): Promise<DomainDnskeyEntity>;
    remove(this: any, reqmatch?: DomainDnskeyRemoveMatch, ctrl?: Control): Promise<DomainDnskeyEntity>;
}
export { DomainDnskeyEntity };
