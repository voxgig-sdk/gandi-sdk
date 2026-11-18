import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsAxfrTsig, LivednsAxfrTsigListMatch, LivednsAxfrTsigUpdateData, LivednsAxfrTsigRemoveMatch } from '../GandiTypes';
declare class LivednsAxfrTsigEntity extends GandiEntityBase<LivednsAxfrTsig> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsAxfrTsigEntity): LivednsAxfrTsigEntity;
    list(this: any, reqmatch?: LivednsAxfrTsigListMatch, ctrl?: Control): Promise<LivednsAxfrTsigEntity[]>;
    update(this: any, reqdata?: LivednsAxfrTsigUpdateData, ctrl?: Control): Promise<LivednsAxfrTsigEntity>;
    remove(this: any, reqmatch?: LivednsAxfrTsigRemoveMatch, ctrl?: Control): Promise<LivednsAxfrTsigEntity>;
}
export { LivednsAxfrTsigEntity };
