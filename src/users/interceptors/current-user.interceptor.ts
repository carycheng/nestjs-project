import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        // Theory is that this works because everything is in the same
        // ExecutionContext and this request variable resides in the variable memory.
        // It could be that it is nested, so instead of creating a new variable we are creating
        // a new nested attribute on the request variable in the ExecutionContext which we will
        // then have access to in the decorator.
        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }
}