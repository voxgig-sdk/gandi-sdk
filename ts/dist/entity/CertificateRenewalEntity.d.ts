import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { CertificateRenewal, CertificateRenewalCreateData } from '../GandiTypes';
declare class CertificateRenewalEntity extends GandiEntityBase<CertificateRenewal> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificateRenewalEntity): CertificateRenewalEntity;
    create(this: any, reqdata?: CertificateRenewalCreateData, ctrl?: Control): Promise<CertificateRenewalEntity>;
}
export { CertificateRenewalEntity };
