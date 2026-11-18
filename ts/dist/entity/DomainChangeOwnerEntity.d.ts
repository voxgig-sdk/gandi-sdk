import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainChangeOwner, DomainChangeOwnerLoadMatch, DomainChangeOwnerCreateData } from '../GandiTypes';
declare class DomainChangeOwnerEntity extends GandiEntityBase<DomainChangeOwner> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainChangeOwnerEntity): DomainChangeOwnerEntity;
    load(this: any, reqmatch?: DomainChangeOwnerLoadMatch, ctrl?: Control): Promise<DomainChangeOwnerEntity>;
    create(this: any, reqdata?: DomainChangeOwnerCreateData, ctrl?: Control): Promise<DomainChangeOwnerEntity>;
}
export { DomainChangeOwnerEntity };
