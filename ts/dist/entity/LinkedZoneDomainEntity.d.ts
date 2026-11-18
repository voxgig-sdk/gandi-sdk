import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LinkedZoneDomain, LinkedZoneDomainLoadMatch, LinkedZoneDomainListMatch, LinkedZoneDomainUpdateData } from '../GandiTypes';
declare class LinkedZoneDomainEntity extends GandiEntityBase<LinkedZoneDomain> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LinkedZoneDomainEntity): LinkedZoneDomainEntity;
    load(this: any, reqmatch?: LinkedZoneDomainLoadMatch, ctrl?: Control): Promise<LinkedZoneDomainEntity>;
    list(this: any, reqmatch?: LinkedZoneDomainListMatch, ctrl?: Control): Promise<LinkedZoneDomainEntity[]>;
    update(this: any, reqdata?: LinkedZoneDomainUpdateData, ctrl?: Control): Promise<LinkedZoneDomainEntity>;
}
export { LinkedZoneDomainEntity };
