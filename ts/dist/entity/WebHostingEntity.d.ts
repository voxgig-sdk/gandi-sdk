import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { WebHosting, WebHostingLoadMatch, WebHostingListMatch, WebHostingCreateData, WebHostingUpdateData, WebHostingRemoveMatch } from '../GandiTypes';
declare class WebHostingEntity extends GandiEntityBase<WebHosting> {
    constructor(client: GandiSDK, entopts: any);
    make(this: WebHostingEntity): WebHostingEntity;
    load(this: any, reqmatch?: WebHostingLoadMatch, ctrl?: Control): Promise<WebHostingEntity>;
    list(this: any, reqmatch?: WebHostingListMatch, ctrl?: Control): Promise<WebHostingEntity[]>;
    create(this: any, reqdata?: WebHostingCreateData, ctrl?: Control): Promise<WebHostingEntity>;
    update(this: any, reqdata?: WebHostingUpdateData, ctrl?: Control): Promise<WebHostingEntity>;
    remove(this: any, reqmatch?: WebHostingRemoveMatch, ctrl?: Control): Promise<WebHostingEntity>;
}
export { WebHostingEntity };
