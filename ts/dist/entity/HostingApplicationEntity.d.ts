import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { HostingApplication, HostingApplicationLoadMatch, HostingApplicationListMatch } from '../GandiTypes';
declare class HostingApplicationEntity extends GandiEntityBase<HostingApplication> {
    constructor(client: GandiSDK, entopts: any);
    make(this: HostingApplicationEntity): HostingApplicationEntity;
    load(this: any, reqmatch?: HostingApplicationLoadMatch, ctrl?: Control): Promise<HostingApplicationEntity>;
    list(this: any, reqmatch?: HostingApplicationListMatch, ctrl?: Control): Promise<HostingApplicationEntity[]>;
}
export { HostingApplicationEntity };
