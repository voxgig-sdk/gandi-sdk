import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { EmailOffer, EmailOfferLoadMatch, EmailOfferUpdateData } from '../GandiTypes';
declare class EmailOfferEntity extends GandiEntityBase<EmailOffer> {
    constructor(client: GandiSDK, entopts: any);
    make(this: EmailOfferEntity): EmailOfferEntity;
    load(this: any, reqmatch?: EmailOfferLoadMatch, ctrl?: Control): Promise<EmailOfferEntity>;
    update(this: any, reqdata?: EmailOfferUpdateData, ctrl?: Control): Promise<EmailOfferEntity>;
}
export { EmailOfferEntity };
