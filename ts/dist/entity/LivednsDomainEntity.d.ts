import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsDomain, LivednsDomainLoadMatch, LivednsDomainListMatch, LivednsDomainCreateData, LivednsDomainUpdateData, LivednsDomainRemoveMatch } from '../GandiTypes';
declare class LivednsDomainEntity extends GandiEntityBase<LivednsDomain> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsDomainEntity): LivednsDomainEntity;
    load(this: any, reqmatch?: LivednsDomainLoadMatch, ctrl?: Control): Promise<LivednsDomainEntity>;
    list(this: any, reqmatch?: LivednsDomainListMatch, ctrl?: Control): Promise<LivednsDomainEntity[]>;
    create(this: any, reqdata?: LivednsDomainCreateData, ctrl?: Control): Promise<LivednsDomainEntity>;
    update(this: any, reqdata?: LivednsDomainUpdateData, ctrl?: Control): Promise<LivednsDomainEntity>;
    remove(this: any, reqmatch?: LivednsDomainRemoveMatch, ctrl?: Control): Promise<LivednsDomainEntity>;
}
export { LivednsDomainEntity };
