import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { CertificatePem, CertificatePemLoadMatch } from '../GandiTypes';
declare class CertificatePemEntity extends GandiEntityBase<CertificatePem> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificatePemEntity): CertificatePemEntity;
    load(this: any, reqmatch?: CertificatePemLoadMatch, ctrl?: Control): Promise<CertificatePemEntity>;
}
export { CertificatePemEntity };
