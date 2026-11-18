import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Nt, NtLoadMatch } from '../GandiTypes';
declare class NtEntity extends GandiEntityBase<Nt> {
    constructor(client: GandiSDK, entopts: any);
    make(this: NtEntity): NtEntity;
    load(this: any, reqmatch?: NtLoadMatch, ctrl?: Control): Promise<NtEntity>;
}
export { NtEntity };
