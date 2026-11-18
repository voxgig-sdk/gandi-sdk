import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainClaim, DomainClaimLoadMatch, DomainClaimCreateData } from '../GandiTypes';
declare class DomainClaimEntity extends GandiEntityBase<DomainClaim> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainClaimEntity): DomainClaimEntity;
    load(this: any, reqmatch?: DomainClaimLoadMatch, ctrl?: Control): Promise<DomainClaimEntity>;
    create(this: any, reqdata?: DomainClaimCreateData, ctrl?: Control): Promise<DomainClaimEntity>;
}
export { DomainClaimEntity };
