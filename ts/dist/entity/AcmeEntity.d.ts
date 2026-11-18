import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Acme, AcmeLoadMatch, AcmeListMatch, AcmeCreateData, AcmeUpdateData, AcmeRemoveMatch } from '../GandiTypes';
declare class AcmeEntity extends GandiEntityBase<Acme> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AcmeEntity): AcmeEntity;
    load(this: any, reqmatch?: AcmeLoadMatch, ctrl?: Control): Promise<AcmeEntity>;
    list(this: any, reqmatch?: AcmeListMatch, ctrl?: Control): Promise<AcmeEntity[]>;
    create(this: any, reqdata?: AcmeCreateData, ctrl?: Control): Promise<AcmeEntity>;
    update(this: any, reqdata?: AcmeUpdateData, ctrl?: Control): Promise<AcmeEntity>;
    remove(this: any, reqmatch?: AcmeRemoveMatch, ctrl?: Control): Promise<AcmeEntity>;
}
export { AcmeEntity };
