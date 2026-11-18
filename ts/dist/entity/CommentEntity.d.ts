import { GandiEntityBase } from '../GandiEntityBase';
import type { GandiSDK } from '../GandiSDK';
import type { Control } from '../types';
import type { Comment, CommentLoadMatch, CommentCreateData, CommentRemoveMatch } from '../GandiTypes';
declare class CommentEntity extends GandiEntityBase<Comment> {
    constructor(client: GandiSDK, entopts: any);
    make(this: CommentEntity): CommentEntity;
    load(this: any, reqmatch?: CommentLoadMatch, ctrl?: Control): Promise<CommentEntity>;
    create(this: any, reqdata?: CommentCreateData, ctrl?: Control): Promise<CommentEntity>;
    remove(this: any, reqmatch?: CommentRemoveMatch, ctrl?: Control): Promise<CommentEntity>;
}
export { CommentEntity };
