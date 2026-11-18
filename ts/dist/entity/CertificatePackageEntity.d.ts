import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { CertificatePackage, CertificatePackageLoadMatch, CertificatePackageListMatch } from '../GandiTypes';
declare class CertificatePackageEntity extends GandiEntityBase<CertificatePackage> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CertificatePackageEntity): CertificatePackageEntity;
    load(this: any, reqmatch?: CertificatePackageLoadMatch, ctrl?: Control): Promise<CertificatePackageEntity>;
    list(this: any, reqmatch?: CertificatePackageListMatch, ctrl?: Control): Promise<CertificatePackageEntity[]>;
}
export { CertificatePackageEntity };
