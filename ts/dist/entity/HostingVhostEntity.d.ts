import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { HostingVhost, HostingVhostLoadMatch, HostingVhostListMatch, HostingVhostCreateData, HostingVhostUpdateData, HostingVhostRemoveMatch } from '../GandiTypes';
declare class HostingVhostEntity extends GandiEntityBase<HostingVhost> {
    constructor(client: GandiSDK, entopts: any);
    make(this: HostingVhostEntity): HostingVhostEntity;
    load(this: any, reqmatch?: HostingVhostLoadMatch, ctrl?: Control): Promise<HostingVhostEntity>;
    list(this: any, reqmatch?: HostingVhostListMatch, ctrl?: Control): Promise<HostingVhostEntity[]>;
    create(this: any, reqdata?: HostingVhostCreateData, ctrl?: Control): Promise<HostingVhostEntity>;
    update(this: any, reqdata?: HostingVhostUpdateData, ctrl?: Control): Promise<HostingVhostEntity>;
    remove(this: any, reqmatch?: HostingVhostRemoveMatch, ctrl?: Control): Promise<HostingVhostEntity>;
}
export { HostingVhostEntity };
