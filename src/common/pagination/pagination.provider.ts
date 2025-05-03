import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ) {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    };
    if (where) {
      findOptions.where = where;
    }

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
    const currentPage = paginationQueryDto.page;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    const result = await repository.find(findOptions);
    const response = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: totalItems,
        currentPage: currentPage,
        totalPages: totalPages,
        links: {},
      },
    };

    return result;
  }
}
