import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export async function paginationWithFilter<T extends ObjectLiteral>(
  repository: Repository<T>,
  paginationParams: { page: number; limit: number },
  filterOptions: FindManyOptions<T> = {},
) {
  const { page, limit } = paginationParams;

  // skip rows for display current page
  // e.g. current page is 2 must skip first 10 rows
  const skip = (page - 1) * limit;

  const [data, total] = await repository.findAndCount({
    ...filterOptions,
    take: limit,
    skip, // OFFSET in SQL
  });

  return {
    rows: data,
    total,
    page,
    lastPage: Math.ceil(total / limit),
  };
}
