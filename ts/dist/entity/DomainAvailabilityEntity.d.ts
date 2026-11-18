import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainAvailability, DomainAvailabilityLoadMatch } from '../GandiTypes';
declare class DomainAvailabilityEntity extends GandiEntityBase<DomainAvailability> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainAvailabilityEntity): DomainAvailabilityEntity;
    load(this: any, reqmatch?: DomainAvailabilityLoadMatch, ctrl?: Control): Promise<DomainAvailabilityEntity>;
}
export { DomainAvailabilityEntity };
