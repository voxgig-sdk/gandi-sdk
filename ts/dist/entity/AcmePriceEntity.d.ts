import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { AcmePrice, AcmePriceListMatch, AcmePriceCreateData } from '../GandiTypes';
declare class AcmePriceEntity extends GandiEntityBase<AcmePrice> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AcmePriceEntity): AcmePriceEntity;
    list(this: any, reqmatch?: AcmePriceListMatch, ctrl?: Control): Promise<AcmePriceEntity[]>;
    create(this: any, reqdata?: AcmePriceCreateData, ctrl?: Control): Promise<AcmePriceEntity>;
}
export { AcmePriceEntity };
