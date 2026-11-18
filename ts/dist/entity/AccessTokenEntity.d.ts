import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { AccessToken, AccessTokenCreateData } from '../GandiTypes';
declare class AccessTokenEntity extends GandiEntityBase<AccessToken> {
    constructor(client: GandiSDK, entopts: any);
    make(this: AccessTokenEntity): AccessTokenEntity;
    create(this: any, reqdata?: AccessTokenCreateData, ctrl?: Control): Promise<AccessTokenEntity>;
}
export { AccessTokenEntity };
