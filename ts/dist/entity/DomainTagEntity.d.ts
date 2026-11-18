import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainTag, DomainTagListMatch, DomainTagCreateData, DomainTagUpdateData, DomainTagPatchData, DomainTagRemoveMatch } from '../GandiTypes';
declare class DomainTagEntity extends GandiEntityBase<DomainTag> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainTagEntity): DomainTagEntity;
    list(this: any, reqmatch?: DomainTagListMatch, ctrl?: Control): Promise<DomainTagEntity[]>;
    create(this: any, reqdata?: DomainTagCreateData, ctrl?: Control): Promise<DomainTagEntity>;
    update(this: any, reqdata?: DomainTagUpdateData, ctrl?: Control): Promise<DomainTagEntity>;
    patch(this: any, reqdata?: DomainTagPatchData, ctrl?: Control): Promise<DomainTagEntity>;
    remove(this: any, reqmatch?: DomainTagRemoveMatch, ctrl?: Control): Promise<DomainTagEntity>;
}
export { DomainTagEntity };
