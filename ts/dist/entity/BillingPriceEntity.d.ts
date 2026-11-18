import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { BillingPrice, BillingPriceLoadMatch } from '../GandiTypes';
declare class BillingPriceEntity extends GandiEntityBase<BillingPrice> {
    constructor(client: GandiSDK, entopts: any);
    make(this: BillingPriceEntity): BillingPriceEntity;
    load(this: any, reqmatch?: BillingPriceLoadMatch, ctrl?: Control): Promise<BillingPriceEntity>;
}
export { BillingPriceEntity };
