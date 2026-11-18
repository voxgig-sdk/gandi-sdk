import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsRrtype, LivednsRrtypeListMatch } from '../GandiTypes';
declare class LivednsRrtypeEntity extends GandiEntityBase<LivednsRrtype> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsRrtypeEntity): LivednsRrtypeEntity;
    list(this: any, reqmatch?: LivednsRrtypeListMatch, ctrl?: Control): Promise<LivednsRrtypeEntity[]>;
}
export { LivednsRrtypeEntity };
