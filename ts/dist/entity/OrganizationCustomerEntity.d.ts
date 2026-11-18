import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { OrganizationCustomer, OrganizationCustomerLoadMatch, OrganizationCustomerListMatch, OrganizationCustomerCreateData, OrganizationCustomerUpdateData, OrganizationCustomerRemoveMatch } from '../GandiTypes';
declare class OrganizationCustomerEntity extends GandiEntityBase<OrganizationCustomer> {
    constructor(client: GandiSDK, entopts: any);
    make(this: OrganizationCustomerEntity): OrganizationCustomerEntity;
    load(this: any, reqmatch?: OrganizationCustomerLoadMatch, ctrl?: Control): Promise<OrganizationCustomerEntity>;
    list(this: any, reqmatch?: OrganizationCustomerListMatch, ctrl?: Control): Promise<OrganizationCustomerEntity[]>;
    create(this: any, reqdata?: OrganizationCustomerCreateData, ctrl?: Control): Promise<OrganizationCustomerEntity>;
    update(this: any, reqdata?: OrganizationCustomerUpdateData, ctrl?: Control): Promise<OrganizationCustomerEntity>;
    remove(this: any, reqmatch?: OrganizationCustomerRemoveMatch, ctrl?: Control): Promise<OrganizationCustomerEntity>;
}
export { OrganizationCustomerEntity };
