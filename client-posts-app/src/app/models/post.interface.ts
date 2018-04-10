import { Comment } from './comment.interface';
export interface Post {
    text: String;
    title: String;
    creator: String;
    createdAt: Date;
    comments: [Comment];
    isDeleted: Boolean;
}
