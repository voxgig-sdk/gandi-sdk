import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Certificate, CertificateLoadMatch, CertificateListMatch, CertificateCreateData, CertificateUpdateData, CertificatePatchData, CertificateRemoveMatch } from '../GandiTypes';
declare class CertificateEntity extends GandiEntityBase<Certificate> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificateEntity): CertificateEntity;
    load(this: any, reqmatch?: CertificateLoadMatch, ctrl?: Control): Promise<CertificateEntity>;
    list(this: any, reqmatch?: CertificateListMatch, ctrl?: Control): Promise<CertificateEntity[]>;
    create(this: any, reqdata?: CertificateCreateData, ctrl?: Control): Promise<CertificateEntity>;
    update(this: any, reqdata?: CertificateUpdateData, ctrl?: Control): Promise<CertificateEntity>;
    patch(this: any, reqdata?: CertificatePatchData, ctrl?: Control): Promise<CertificateEntity>;
    remove(this: any, reqmatch?: CertificateRemoveMatch, ctrl?: Control): Promise<CertificateEntity>;
}
export { CertificateEntity };
