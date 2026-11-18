import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch } from '../GandiTypes';
declare class UserEntity extends GandiEntityBase<User> {
    constructor(client: GandiSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
