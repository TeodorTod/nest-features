import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Paginated } from './paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<Paginated<T>> {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    };
    if (where) {
      findOptions.where = where;
    }

    if (relations) {
      findOptions.relations = relations;
    }

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
    const currentPage = paginationQueryDto.page;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const baseUrl = `${this.request.protocol}://${this.request.get('host')}/`;
    const newUrl = new URL(this.request.url, baseUrl);

    const result = await repository.find(findOptions);
    const response: Paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: totalItems,
        currentPage: currentPage,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.pathname}?page=1&limit=${paginationQueryDto.limit}`,
        last: `${newUrl.pathname}?page=${totalPages}&limit=${paginationQueryDto.limit}`,
        current: `${newUrl.pathname}?page=${currentPage}&limit=${paginationQueryDto.limit}`,
        next: `${newUrl.pathname}?page=${nextPage}&limit=${paginationQueryDto.limit}`,
        previous: `${newUrl.pathname}?page=${previousPage}&limit=${paginationQueryDto.limit}`,
      },
    };

    return response;
  }
}
