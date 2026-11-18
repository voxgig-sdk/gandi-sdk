import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LivednsTsigKey, LivednsTsigKeyLoadMatch, LivednsTsigKeyListMatch, LivednsTsigKeyCreateData } from '../GandiTypes';
declare class LivednsTsigKeyEntity extends GandiEntityBase<LivednsTsigKey> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LivednsTsigKeyEntity): LivednsTsigKeyEntity;
    load(this: any, reqmatch?: LivednsTsigKeyLoadMatch, ctrl?: Control): Promise<LivednsTsigKeyEntity>;
    list(this: any, reqmatch?: LivednsTsigKeyListMatch, ctrl?: Control): Promise<LivednsTsigKeyEntity[]>;
    create(this: any, reqdata?: LivednsTsigKeyCreateData, ctrl?: Control): Promise<LivednsTsigKeyEntity>;
}
export { LivednsTsigKeyEntity };
