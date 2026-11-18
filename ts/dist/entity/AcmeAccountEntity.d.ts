import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { AcmeAccount, AcmeAccountLoadMatch, AcmeAccountListMatch } from '../GandiTypes';
declare class AcmeAccountEntity extends GandiEntityBase<AcmeAccount> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AcmeAccountEntity): AcmeAccountEntity;
    load(this: any, reqmatch?: AcmeAccountLoadMatch, ctrl?: Control): Promise<AcmeAccountEntity>;
    list(this: any, reqmatch?: AcmeAccountListMatch, ctrl?: Control): Promise<AcmeAccountEntity[]>;
}
export { AcmeAccountEntity };
