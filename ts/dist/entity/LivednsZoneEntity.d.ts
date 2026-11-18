import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsZone, LivednsZoneUpdateData, LivednsZoneRemoveMatch } from '../GandiTypes';
declare class LivednsZoneEntity extends GandiEntityBase<LivednsZone> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsZoneEntity): LivednsZoneEntity;
    update(this: any, reqdata?: LivednsZoneUpdateData, ctrl?: Control): Promise<LivednsZoneEntity>;
    remove(this: any, reqmatch?: LivednsZoneRemoveMatch, ctrl?: Control): Promise<LivednsZoneEntity>;
}
export { LivednsZoneEntity };
