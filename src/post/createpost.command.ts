import { Prisma } from "@prisma/client";

export class CreatePostCommand {
    constructor(
        public readonly data: Prisma.PostCreateInput
    ) { }
}
