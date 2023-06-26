import { TableOrder } from 'src/api/types';

export interface TableOptions {
  pagination: {
    pageSize: number;
    pageNum: number;
  };
  sorting: {
    sortBy: string;
    order: TableOrder;
  };
}
