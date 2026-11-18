import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LinkedZoneTask, LinkedZoneTaskLoadMatch, LinkedZoneTaskListMatch } from '../GandiTypes';
declare class LinkedZoneTaskEntity extends GandiEntityBase<LinkedZoneTask> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LinkedZoneTaskEntity): LinkedZoneTaskEntity;
    load(this: any, reqmatch?: LinkedZoneTaskLoadMatch, ctrl?: Control): Promise<LinkedZoneTaskEntity>;
    list(this: any, reqmatch?: LinkedZoneTaskListMatch, ctrl?: Control): Promise<LinkedZoneTaskEntity[]>;
}
export { LinkedZoneTaskEntity };
