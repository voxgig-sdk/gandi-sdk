import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsRecord, LivednsRecordLoadMatch, LivednsRecordListMatch, LivednsRecordCreateData, LivednsRecordUpdateData, LivednsRecordPatchData, LivednsRecordRemoveMatch } from '../GandiTypes';
declare class LivednsRecordEntity extends GandiEntityBase<LivednsRecord> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsRecordEntity): LivednsRecordEntity;
    load(this: any, reqmatch?: LivednsRecordLoadMatch, ctrl?: Control): Promise<LivednsRecordEntity>;
    list(this: any, reqmatch?: LivednsRecordListMatch, ctrl?: Control): Promise<LivednsRecordEntity[]>;
    create(this: any, reqdata?: LivednsRecordCreateData, ctrl?: Control): Promise<LivednsRecordEntity>;
    update(this: any, reqdata?: LivednsRecordUpdateData, ctrl?: Control): Promise<LivednsRecordEntity>;
    patch(this: any, reqdata?: LivednsRecordPatchData, ctrl?: Control): Promise<LivednsRecordEntity>;
    remove(this: any, reqmatch?: LivednsRecordRemoveMatch, ctrl?: Control): Promise<LivednsRecordEntity>;
}
export { LivednsRecordEntity };
