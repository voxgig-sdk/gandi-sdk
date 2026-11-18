import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { AcmeDomain, AcmeDomainLoadMatch, AcmeDomainListMatch } from '../GandiTypes';
declare class AcmeDomainEntity extends GandiEntityBase<AcmeDomain> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AcmeDomainEntity): AcmeDomainEntity;
    load(this: any, reqmatch?: AcmeDomainLoadMatch, ctrl?: Control): Promise<AcmeDomainEntity>;
    list(this: any, reqmatch?: AcmeDomainListMatch, ctrl?: Control): Promise<AcmeDomainEntity[]>;
}
export { AcmeDomainEntity };
