export class FortesDataTable {
  pageIndex = 1;
  offset = 0;
  pageSize = 10;
  total;
  loading = true;
  seacrh = '';
  ordering = '';

  modalSmall = '40%';
  modalMedium = '55%';
  modalLarge = '65%';
  modalExtraLarge = '90%';

  filters = '';

  loadData() {}

  changePageIndex(pageIndex) {
    this.offset = (pageIndex - 1) * this.pageSize;
    this.pageIndex = pageIndex;
    this.loadData();
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize;
    this.loadData();
  }

  search($event) {
    this.seacrh = $event.target.value;

    this.pageIndex = 1;
    this.offset = (this.pageIndex - 1) * this.pageSize;
    this.loadData();
  }

  filter(filter) {
    this.filters = '';

    filter.forEach((e) => {
      const parm = e.params + e.value;
      this.filters = this.filters.concat(parm);
      console.log(this.filters);
    });

    this.pageIndex = 1;
    this.offset = (this.pageIndex - 1) * this.pageSize;

    this.loadData();
  }

  sort(sort: { key: string; value: string }): void {
    if (sort.value === 'ascend') {
      this.ordering = '-' + sort.key;
      this.pageIndex = 1;
      this.offset = (this.pageIndex - 1) * this.pageSize;
      this.loadData();
    }
    if (sort.value === 'descend') {
      this.ordering = '+' + sort.key;
      this.pageIndex = 1;
      this.offset = (this.pageIndex - 1) * this.pageSize;
      this.loadData();
    }
  }
}
