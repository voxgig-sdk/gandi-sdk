import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { LinkedZoneDeployment, LinkedZoneDeploymentCreateData } from '../GandiTypes';
declare class LinkedZoneDeploymentEntity extends GandiEntityBase<LinkedZoneDeployment> {
    constructor(client: GandiSDK, entopts: any);
    make(this: LinkedZoneDeploymentEntity): LinkedZoneDeploymentEntity;
    create(this: any, reqdata?: LinkedZoneDeploymentCreateData, ctrl?: Control): Promise<LinkedZoneDeploymentEntity>;
}
export { LinkedZoneDeploymentEntity };
