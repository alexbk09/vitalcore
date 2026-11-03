import { Pagination } from "@/infrastructure/entities/paginate";

export class PaginationMappers {
  static PaginationToEntity<T>(
    pagination: Pagination<T>,
    data: T[],
    mapper: (item: T) => T
  ): Pagination<T> {
    return {
      current_page: pagination.current_page,
      data: data.map(item => mapper(item)),
      first_page_url: pagination.first_page_url,
      from: pagination.from,
      last_page: pagination.last_page,
      last_page_url: pagination.last_page_url,
      links: pagination.links,
      next_page_url: pagination.next_page_url,
      path: pagination.path,
      per_page: pagination.per_page,
      prev_page_url: pagination.prev_page_url,
      to: pagination.to,
      total: pagination.total
    };
  }
}
