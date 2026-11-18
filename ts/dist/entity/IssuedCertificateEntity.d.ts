import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { IssuedCertificate, IssuedCertificateLoadMatch, IssuedCertificateListMatch, IssuedCertificateCreateData, IssuedCertificateUpdateData, IssuedCertificateRemoveMatch } from '../GandiTypes';
declare class IssuedCertificateEntity extends GandiEntityBase<IssuedCertificate> {
    constructor(client: GandiSDK, entopts: any);
    make(this: IssuedCertificateEntity): IssuedCertificateEntity;
    load(this: any, reqmatch?: IssuedCertificateLoadMatch, ctrl?: Control): Promise<IssuedCertificateEntity>;
    list(this: any, reqmatch?: IssuedCertificateListMatch, ctrl?: Control): Promise<IssuedCertificateEntity[]>;
    create(this: any, reqdata?: IssuedCertificateCreateData, ctrl?: Control): Promise<IssuedCertificateEntity>;
    update(this: any, reqdata?: IssuedCertificateUpdateData, ctrl?: Control): Promise<IssuedCertificateEntity>;
    remove(this: any, reqmatch?: IssuedCertificateRemoveMatch, ctrl?: Control): Promise<IssuedCertificateEntity>;
}
export { IssuedCertificateEntity };
