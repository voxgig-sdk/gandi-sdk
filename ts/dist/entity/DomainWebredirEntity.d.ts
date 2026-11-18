import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainWebredir, DomainWebredirLoadMatch, DomainWebredirListMatch, DomainWebredirCreateData, DomainWebredirUpdateData, DomainWebredirRemoveMatch } from '../GandiTypes';
declare class DomainWebredirEntity extends GandiEntityBase<DomainWebredir> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainWebredirEntity): DomainWebredirEntity;
    load(this: any, reqmatch?: DomainWebredirLoadMatch, ctrl?: Control): Promise<DomainWebredirEntity>;
    list(this: any, reqmatch?: DomainWebredirListMatch, ctrl?: Control): Promise<DomainWebredirEntity[]>;
    create(this: any, reqdata?: DomainWebredirCreateData, ctrl?: Control): Promise<DomainWebredirEntity>;
    update(this: any, reqdata?: DomainWebredirUpdateData, ctrl?: Control): Promise<DomainWebredirEntity>;
    remove(this: any, reqmatch?: DomainWebredirRemoveMatch, ctrl?: Control): Promise<DomainWebredirEntity>;
}
export { DomainWebredirEntity };
