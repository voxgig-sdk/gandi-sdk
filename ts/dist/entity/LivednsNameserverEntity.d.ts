import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsNameserver, LivednsNameserverListMatch } from '../GandiTypes';
declare class LivednsNameserverEntity extends GandiEntityBase<LivednsNameserver> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsNameserverEntity): LivednsNameserverEntity;
    list(this: any, reqmatch?: LivednsNameserverListMatch, ctrl?: Control): Promise<LivednsNameserverEntity[]>;
}
export { LivednsNameserverEntity };
