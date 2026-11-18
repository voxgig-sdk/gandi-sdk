import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainHost, DomainHostLoadMatch, DomainHostListMatch, DomainHostCreateData, DomainHostUpdateData, DomainHostRemoveMatch } from '../GandiTypes';
declare class DomainHostEntity extends GandiEntityBase<DomainHost> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainHostEntity): DomainHostEntity;
    load(this: any, reqmatch?: DomainHostLoadMatch, ctrl?: Control): Promise<DomainHostEntity>;
    list(this: any, reqmatch?: DomainHostListMatch, ctrl?: Control): Promise<DomainHostEntity[]>;
    create(this: any, reqdata?: DomainHostCreateData, ctrl?: Control): Promise<DomainHostEntity>;
    update(this: any, reqdata?: DomainHostUpdateData, ctrl?: Control): Promise<DomainHostEntity>;
    remove(this: any, reqmatch?: DomainHostRemoveMatch, ctrl?: Control): Promise<DomainHostEntity>;
}
export { DomainHostEntity };
