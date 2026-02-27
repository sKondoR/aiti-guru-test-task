import { makeAutoObservable } from 'mobx';

export class TableStore {
  page = 1;
  pageSize = 20;
  searchQuery = '';
  selectedRows: string[] = [];

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
      limit: this.pageSize,
      search: this.searchQuery,
    };
  }
}