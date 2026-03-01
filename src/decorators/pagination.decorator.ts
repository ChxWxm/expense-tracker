import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationParams = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const page = Number.parseInt(request.query.page, 10) || 1;
    const limit = Number.parseInt(request.query.limit, 10) || 10;

    return { page, limit };
  },
);
