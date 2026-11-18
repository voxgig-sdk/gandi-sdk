import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch } from '../GandiTypes';
declare class BillingEntity extends GandiEntityBase<Billing> {
    constructor(client: GandiSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
}
export { BillingEntity };
