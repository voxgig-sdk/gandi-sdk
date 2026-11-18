import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { BillingInfo, BillingInfoLoadMatch } from '../GandiTypes';
declare class BillingInfoEntity extends GandiEntityBase<BillingInfo> {
    constructor(client: GandiSDK, entopts: any);
    make(this: BillingInfoEntity): BillingInfoEntity;
    load(this: any, reqmatch?: BillingInfoLoadMatch, ctrl?: Control): Promise<BillingInfoEntity>;
}
export { BillingInfoEntity };
