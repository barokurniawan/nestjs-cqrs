import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostCommand } from './createpost.command';

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
        private commandBus: CommandBus,
    ) { }

    async post(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    ): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        console.log("Here... 1");
        return this.commandBus.execute(new CreatePostCommand(data));
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }
}
