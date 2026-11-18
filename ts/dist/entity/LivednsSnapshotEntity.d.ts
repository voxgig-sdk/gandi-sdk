import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsSnapshot, LivednsSnapshotLoadMatch, LivednsSnapshotListMatch, LivednsSnapshotCreateData, LivednsSnapshotUpdateData, LivednsSnapshotRemoveMatch } from '../GandiTypes';
declare class LivednsSnapshotEntity extends GandiEntityBase<LivednsSnapshot> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsSnapshotEntity): LivednsSnapshotEntity;
    load(this: any, reqmatch?: LivednsSnapshotLoadMatch, ctrl?: Control): Promise<LivednsSnapshotEntity>;
    list(this: any, reqmatch?: LivednsSnapshotListMatch, ctrl?: Control): Promise<LivednsSnapshotEntity[]>;
    create(this: any, reqdata?: LivednsSnapshotCreateData, ctrl?: Control): Promise<LivednsSnapshotEntity>;
    update(this: any, reqdata?: LivednsSnapshotUpdateData, ctrl?: Control): Promise<LivednsSnapshotEntity>;
    remove(this: any, reqmatch?: LivednsSnapshotRemoveMatch, ctrl?: Control): Promise<LivednsSnapshotEntity>;
}
export { LivednsSnapshotEntity };
