import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { AcmeSubscription, AcmeSubscriptionLoadMatch, AcmeSubscriptionListMatch, AcmeSubscriptionCreateData, AcmeSubscriptionUpdateData, AcmeSubscriptionRemoveMatch } from '../GandiTypes';
declare class AcmeSubscriptionEntity extends GandiEntityBase<AcmeSubscription> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AcmeSubscriptionEntity): AcmeSubscriptionEntity;
    load(this: any, reqmatch?: AcmeSubscriptionLoadMatch, ctrl?: Control): Promise<AcmeSubscriptionEntity>;
    list(this: any, reqmatch?: AcmeSubscriptionListMatch, ctrl?: Control): Promise<AcmeSubscriptionEntity[]>;
    create(this: any, reqdata?: AcmeSubscriptionCreateData, ctrl?: Control): Promise<AcmeSubscriptionEntity>;
    update(this: any, reqdata?: AcmeSubscriptionUpdateData, ctrl?: Control): Promise<AcmeSubscriptionEntity>;
    remove(this: any, reqmatch?: AcmeSubscriptionRemoveMatch, ctrl?: Control): Promise<AcmeSubscriptionEntity>;
}
export { AcmeSubscriptionEntity };
