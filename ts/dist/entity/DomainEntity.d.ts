import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Domain, DomainLoadMatch, DomainListMatch, DomainCreateData, DomainUpdateData, DomainRemoveMatch } from '../GandiTypes';
declare class DomainEntity extends GandiEntityBase<Domain> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainEntity): DomainEntity;
    load(this: any, reqmatch?: DomainLoadMatch, ctrl?: Control): Promise<DomainEntity>;
    list(this: any, reqmatch?: DomainListMatch, ctrl?: Control): Promise<DomainEntity[]>;
    create(this: any, reqdata?: DomainCreateData, ctrl?: Control): Promise<DomainEntity>;
    update(this: any, reqdata?: DomainUpdateData, ctrl?: Control): Promise<DomainEntity>;
    remove(this: any, reqmatch?: DomainRemoveMatch, ctrl?: Control): Promise<DomainEntity>;
}
export { DomainEntity };
