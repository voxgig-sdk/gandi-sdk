import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Tld, TldLoadMatch, TldListMatch } from '../GandiTypes';
declare class TldEntity extends GandiEntityBase<Tld> {
    constructor(client: GandiSDK, entopts: any);
    make(this: TldEntity): TldEntity;
    load(this: any, reqmatch?: TldLoadMatch, ctrl?: Control): Promise<TldEntity>;
    list(this: any, reqmatch?: TldListMatch, ctrl?: Control): Promise<TldEntity[]>;
}
export { TldEntity };
