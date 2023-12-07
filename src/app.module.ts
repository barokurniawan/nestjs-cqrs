import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { PrismaService } from './prisma/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostCommandHandler, CreatePostEventHandler } from './post/createpost.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    UserService,
    PostService,
    CreatePostCommandHandler,
    CreatePostEventHandler
  ],
})
export class AppModule { }
