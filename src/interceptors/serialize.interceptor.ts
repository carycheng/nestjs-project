import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler) : Observable {
        // Run something before request is handled
        // console.log('Im running before the handler', context);

        return handler.handle().pipe(
            map((data: any) => {
                // Run something before response is sent out.
                // console.log('Im running before respose is sent out', data);
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true,
                })
            }),
        );
    }
}