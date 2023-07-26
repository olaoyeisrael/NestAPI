import { createParamDecorator} from "@nestjs/common/decorators/http/create-route-param-metadata.decorator"
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
export const GetUser= createParamDecorator (
    (
        data:unknown, ctx:ExecutionContext)=>{
            const request = ctx
            .switchToHttp()
            .getRequest();
            return request.user;
        }

    )

