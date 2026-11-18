import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsAxfrSlave, LivednsAxfrSlaveListMatch, LivednsAxfrSlaveUpdateData, LivednsAxfrSlaveRemoveMatch } from '../GandiTypes';
declare class LivednsAxfrSlaveEntity extends GandiEntityBase<LivednsAxfrSlave> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsAxfrSlaveEntity): LivednsAxfrSlaveEntity;
    list(this: any, reqmatch?: LivednsAxfrSlaveListMatch, ctrl?: Control): Promise<LivednsAxfrSlaveEntity[]>;
    update(this: any, reqdata?: LivednsAxfrSlaveUpdateData, ctrl?: Control): Promise<LivednsAxfrSlaveEntity>;
    remove(this: any, reqmatch?: LivednsAxfrSlaveRemoveMatch, ctrl?: Control): Promise<LivednsAxfrSlaveEntity>;
}
export { LivednsAxfrSlaveEntity };
