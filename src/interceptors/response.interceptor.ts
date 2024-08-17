import { IResponse } from '@lib/interfaces/response.interface';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse<T>>  {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
        return next
            .handle()
            .pipe(
                map(
                    data => ({
                        status: 'success',
                        data
                    })
                )
            );
    }
} 