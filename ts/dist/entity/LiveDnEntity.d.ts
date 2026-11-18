import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LiveDn, LiveDnLoadMatch, LiveDnListMatch, LiveDnCreateData, LiveDnUpdateData, LiveDnPatchData, LiveDnRemoveMatch } from '../GandiTypes';
declare class LiveDnEntity extends GandiEntityBase<LiveDn> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LiveDnEntity): LiveDnEntity;
    load(this: any, reqmatch?: LiveDnLoadMatch, ctrl?: Control): Promise<LiveDnEntity>;
    list(this: any, reqmatch?: LiveDnListMatch, ctrl?: Control): Promise<LiveDnEntity[]>;
    create(this: any, reqdata?: LiveDnCreateData, ctrl?: Control): Promise<LiveDnEntity>;
    update(this: any, reqdata?: LiveDnUpdateData, ctrl?: Control): Promise<LiveDnEntity>;
    patch(this: any, reqdata?: LiveDnPatchData, ctrl?: Control): Promise<LiveDnEntity>;
    remove(this: any, reqmatch?: LiveDnRemoveMatch, ctrl?: Control): Promise<LiveDnEntity>;
}
export { LiveDnEntity };
