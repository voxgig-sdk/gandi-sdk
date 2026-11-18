import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { TemplateDispatch, TemplateDispatchLoadMatch, TemplateDispatchCreateData } from '../GandiTypes';
declare class TemplateDispatchEntity extends GandiEntityBase<TemplateDispatch> {
    constructor(client: GandiSDK, entopts: any);
    make(this: TemplateDispatchEntity): TemplateDispatchEntity;
    load(this: any, reqmatch?: TemplateDispatchLoadMatch, ctrl?: Control): Promise<TemplateDispatchEntity>;
    create(this: any, reqdata?: TemplateDispatchCreateData, ctrl?: Control): Promise<TemplateDispatchEntity>;
}
export { TemplateDispatchEntity };
