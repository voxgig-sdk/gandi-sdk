import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { DomainTransfer, DomainTransferLoadMatch, DomainTransferCreateData, DomainTransferUpdateData } from '../GandiTypes';
declare class DomainTransferEntity extends GandiEntityBase<DomainTransfer> {
    constructor(client: GandiSDK, entopts: any);
    make(this: DomainTransferEntity): DomainTransferEntity;
    load(this: any, reqmatch?: DomainTransferLoadMatch, ctrl?: Control): Promise<DomainTransferEntity>;
    create(this: any, reqdata?: DomainTransferCreateData, ctrl?: Control): Promise<DomainTransferEntity>;
    update(this: any, reqdata?: DomainTransferUpdateData, ctrl?: Control): Promise<DomainTransferEntity>;
}
export { DomainTransferEntity };
