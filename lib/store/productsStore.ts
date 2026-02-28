import { makeAutoObservable } from 'mobx';

export type SortOrder = 'asc' | 'desc'

export class TableStore {
  page = 1;
  limit = 5;
  searchQuery = '';
  selectedRows: string[] = [];
  sortBy = '';
  order = 'asc' as SortOrder;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.page = page;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.page = 1;
  }

  toggleRowSelection(id: string) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id);
    } else {
      this.selectedRows.push(id);
    }
  }

  get queryParams() {
    return {
      page: this.page,
      limit: this.limit,
      search: this.searchQuery,
      sortBy: this.sortBy,
      order: this.order
    };
  }
}