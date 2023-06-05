import { TableOptions } from './types';

// TODO: need to figure out how to handle bad params set by user (eg. pageNum='asdfsdf')
export const setInitialTableState = (
  localStorageKey: string,
  tableOptions: TableOptions,
): TableOptions => {
  const pageNumParam = getUrlSearchParam('pageNum');
  const pageSizeParam = getUrlSearchParam('pageSize');
  const orderParam = getUrlSearchParam('order') as
    | TableOptions['sorting']['order']
    | undefined;
  const sortByParam = getUrlSearchParam('sortBy');

  // fetching LS
  const rawTableOptions = localStorage.getItem(localStorageKey);

  const hasAllTableOptionParams =
    pageNumParam && pageSizeParam && orderParam && sortByParam;

  // 1.
  // TODO: need to figure out how to set/keep active url search params...
  // on navigate to tables for first time, or navigate to and fro from others
  if (!hasAllTableOptionParams && !rawTableOptions) {
    setTableOptionsUrlSearchParams(tableOptions);

    return tableOptions;
  }

  // 2.
  if (!hasAllTableOptionParams && rawTableOptions) {
    const parsedTableOptions = JSON.parse(rawTableOptions) as TableOptions;

    setTableOptionsUrlSearchParams(parsedTableOptions);

    return parsedTableOptions;
  }

  // 3. both versions of having hasAllTableOptionParams set
  if (hasAllTableOptionParams) {
    return {
      pagination: {
        pageNum: parseInt(pageNumParam, 10),
        pageSize: Number(pageSizeParam),
      },
      sorting: { sortBy: sortByParam, order: orderParam },
    };
  }

  return tableOptions;
};

export const setInitialStateWithLSTableOptions = <T>(
  localStorageKey: string,
  defaultState: T,
) => {
  const rawTableOptions = localStorage.getItem(localStorageKey);

  if (rawTableOptions === null) {
    return defaultState;
  }

  const tableOptions = JSON.parse(rawTableOptions) as TableOptions;

  return {
    ...defaultState,
    tableOptions,
  };
};

export const getUrlSearchParam = (value: string) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);

    const param = searchParams.get(value);

    return param;
  }
};

export const setUrlSearchParams = (key: string, value: string | number) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, typeof value === 'number' ? value.toString() : value);

    const newRelativePathQuery = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, '', newRelativePathQuery);
  }
};

export const setTableOptionsUrlSearchParams = (tableOptions: TableOptions) => {
  const {
    pagination: { pageNum, pageSize },
    sorting: { order, sortBy },
  } = tableOptions;

  setUrlSearchParams('pageNum', pageNum);
  setUrlSearchParams('pageSize', pageSize);
  setUrlSearchParams('order', order);
  setUrlSearchParams('sortBy', sortBy);
};
