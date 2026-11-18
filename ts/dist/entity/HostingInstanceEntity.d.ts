import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { HostingInstance, HostingInstanceLoadMatch, HostingInstanceListMatch, HostingInstanceCreateData, HostingInstanceUpdateData, HostingInstanceRemoveMatch } from '../GandiTypes';
declare class HostingInstanceEntity extends GandiEntityBase<HostingInstance> {
    constructor(client: GandiSDK, entopts: any);
    make(this: HostingInstanceEntity): HostingInstanceEntity;
    load(this: any, reqmatch?: HostingInstanceLoadMatch, ctrl?: Control): Promise<HostingInstanceEntity>;
    list(this: any, reqmatch?: HostingInstanceListMatch, ctrl?: Control): Promise<HostingInstanceEntity[]>;
    create(this: any, reqdata?: HostingInstanceCreateData, ctrl?: Control): Promise<HostingInstanceEntity>;
    update(this: any, reqdata?: HostingInstanceUpdateData, ctrl?: Control): Promise<HostingInstanceEntity>;
    remove(this: any, reqmatch?: HostingInstanceRemoveMatch, ctrl?: Control): Promise<HostingInstanceEntity>;
}
export { HostingInstanceEntity };
