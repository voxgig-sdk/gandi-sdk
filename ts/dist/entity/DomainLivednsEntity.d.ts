import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainLivedns, DomainLivednsLoadMatch, DomainLivednsCreateData } from '../GandiTypes';
declare class DomainLivednsEntity extends GandiEntityBase<DomainLivedns> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainLivednsEntity): DomainLivednsEntity;
    load(this: any, reqmatch?: DomainLivednsLoadMatch, ctrl?: Control): Promise<DomainLivednsEntity>;
    create(this: any, reqdata?: DomainLivednsCreateData, ctrl?: Control): Promise<DomainLivednsEntity>;
}
export { DomainLivednsEntity };
