import { CommandHandler, EventBus, EventsHandler, ICommandHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "./createpost.command";
import { CreatePostEvent } from "./createpost.event";
import { log } from "console";
import { PrismaService } from "src/prisma/prisma.service";

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand> {
    constructor(
        private prisma: PrismaService,
        private eventBus: EventBus,
    ) { }

    async execute(command: CreatePostCommand) {
        const post = await this.prisma.post.create({
            data: command.data
        });

        console.log("Publishing event..");
        this.eventBus.publish(new CreatePostEvent(post));
        return post;
    }
}

@EventsHandler(CreatePostEvent)
export class CreatePostEventHandler implements IEventHandler<CreatePostEvent> {
    constructor() { }

    handle(event: CreatePostEvent) {
        log("event.post: ", JSON.stringify(event.post));
    }
}