import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsKey, LivednsKeyLoadMatch, LivednsKeyListMatch, LivednsKeyCreateData, LivednsKeyUpdateData, LivednsKeyRemoveMatch } from '../GandiTypes';
declare class LivednsKeyEntity extends GandiEntityBase<LivednsKey> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsKeyEntity): LivednsKeyEntity;
    load(this: any, reqmatch?: LivednsKeyLoadMatch, ctrl?: Control): Promise<LivednsKeyEntity>;
    list(this: any, reqmatch?: LivednsKeyListMatch, ctrl?: Control): Promise<LivednsKeyEntity[]>;
    create(this: any, reqdata?: LivednsKeyCreateData, ctrl?: Control): Promise<LivednsKeyEntity>;
    update(this: any, reqdata?: LivednsKeyUpdateData, ctrl?: Control): Promise<LivednsKeyEntity>;
    remove(this: any, reqmatch?: LivednsKeyRemoveMatch, ctrl?: Control): Promise<LivednsKeyEntity>;
}
export { LivednsKeyEntity };
