import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainContact, DomainContactLoadMatch, DomainContactUpdateData } from '../GandiTypes';
declare class DomainContactEntity extends GandiEntityBase<DomainContact> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainContactEntity): DomainContactEntity;
    load(this: any, reqmatch?: DomainContactLoadMatch, ctrl?: Control): Promise<DomainContactEntity>;
    update(this: any, reqdata?: DomainContactUpdateData, ctrl?: Control): Promise<DomainContactEntity>;
}
export { DomainContactEntity };
