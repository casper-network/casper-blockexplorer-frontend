import { TableOptions } from './types';

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
