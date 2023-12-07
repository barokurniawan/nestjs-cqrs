import { Post } from "@prisma/client";

export class CreatePostEvent {
    constructor(
        public readonly post: Post
    ) { }
}
