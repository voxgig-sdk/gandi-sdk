import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainDnssec, DomainDnssecLoadMatch, DomainDnssecCreateData, DomainDnssecRemoveMatch } from '../GandiTypes';
declare class DomainDnssecEntity extends GandiEntityBase<DomainDnssec> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainDnssecEntity): DomainDnssecEntity;
    load(this: any, reqmatch?: DomainDnssecLoadMatch, ctrl?: Control): Promise<DomainDnssecEntity>;
    create(this: any, reqdata?: DomainDnssecCreateData, ctrl?: Control): Promise<DomainDnssecEntity>;
    remove(this: any, reqmatch?: DomainDnssecRemoveMatch, ctrl?: Control): Promise<DomainDnssecEntity>;
}
export { DomainDnssecEntity };
