import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LinkedZone, LinkedZoneLoadMatch, LinkedZoneListMatch, LinkedZoneCreateData, LinkedZoneUpdateData, LinkedZoneRemoveMatch } from '../GandiTypes';
declare class LinkedZoneEntity extends GandiEntityBase<LinkedZone> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LinkedZoneEntity): LinkedZoneEntity;
    load(this: any, reqmatch?: LinkedZoneLoadMatch, ctrl?: Control): Promise<LinkedZoneEntity>;
    list(this: any, reqmatch?: LinkedZoneListMatch, ctrl?: Control): Promise<LinkedZoneEntity[]>;
    create(this: any, reqdata?: LinkedZoneCreateData, ctrl?: Control): Promise<LinkedZoneEntity>;
    update(this: any, reqdata?: LinkedZoneUpdateData, ctrl?: Control): Promise<LinkedZoneEntity>;
    remove(this: any, reqmatch?: LinkedZoneRemoveMatch, ctrl?: Control): Promise<LinkedZoneEntity>;
}
export { LinkedZoneEntity };
