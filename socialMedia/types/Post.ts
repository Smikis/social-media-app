import { Comment } from "./Comment";

export type Post = {
    id:          string;
    description: string;
    imageLink:   string;
    authorId:    string;
    likes:       number;
    shares:      number;
    comments:    Comment[];
    createdAt:   Date;
}