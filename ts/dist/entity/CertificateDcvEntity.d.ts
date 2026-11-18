import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { CertificateDcv, CertificateDcvUpdateData, CertificateDcvPatchData } from '../GandiTypes';
declare class CertificateDcvEntity extends GandiEntityBase<CertificateDcv> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificateDcvEntity): CertificateDcvEntity;
    update(this: any, reqdata?: CertificateDcvUpdateData, ctrl?: Control): Promise<CertificateDcvEntity>;
    patch(this: any, reqdata?: CertificateDcvPatchData, ctrl?: Control): Promise<CertificateDcvEntity>;
}
export { CertificateDcvEntity };
