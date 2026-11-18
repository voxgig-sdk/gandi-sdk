import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainNameserver, DomainNameserverListMatch, DomainNameserverUpdateData } from '../GandiTypes';
declare class DomainNameserverEntity extends GandiEntityBase<DomainNameserver> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainNameserverEntity): DomainNameserverEntity;
    list(this: any, reqmatch?: DomainNameserverListMatch, ctrl?: Control): Promise<DomainNameserverEntity[]>;
    update(this: any, reqdata?: DomainNameserverUpdateData, ctrl?: Control): Promise<DomainNameserverEntity>;
}
export { DomainNameserverEntity };
