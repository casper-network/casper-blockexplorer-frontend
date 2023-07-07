export interface TableOptions {
  pagination: {
    pageSize: number;
    pageNum: number;
  };
  sorting: {
    sortBy: string;
    order: 'asc' | 'desc';
  };
}
