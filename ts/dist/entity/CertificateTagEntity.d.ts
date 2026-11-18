import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { CertificateTag, CertificateTagListMatch, CertificateTagCreateData, CertificateTagUpdateData, CertificateTagPatchData, CertificateTagRemoveMatch } from '../GandiTypes';
declare class CertificateTagEntity extends GandiEntityBase<CertificateTag> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificateTagEntity): CertificateTagEntity;
    list(this: any, reqmatch?: CertificateTagListMatch, ctrl?: Control): Promise<CertificateTagEntity[]>;
    create(this: any, reqdata?: CertificateTagCreateData, ctrl?: Control): Promise<CertificateTagEntity>;
    update(this: any, reqdata?: CertificateTagUpdateData, ctrl?: Control): Promise<CertificateTagEntity>;
    patch(this: any, reqdata?: CertificateTagPatchData, ctrl?: Control): Promise<CertificateTagEntity>;
    remove(this: any, reqmatch?: CertificateTagRemoveMatch, ctrl?: Control): Promise<CertificateTagEntity>;
}
export { CertificateTagEntity };
