import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnChanges {
  @Input() filters: { key: string, display: string, type?: string }[] = [];
  @Output() filterChanged = new EventEmitter<{ key: string, value: string, condition: string }>();
  @Output() filterRemoved = new EventEmitter<string>();
  @Output() filtersReset = new EventEmitter<void>();

  showFilters = false;
  filterValues: { [key: string]: string } = {};
  advancedFilterOptions: { [key: string]: string } = {}; // Para guardar el estado de los filtros avanzados
  showAdvancedFilters = false; // Para controlar si se muestran los filtros avanzados

  ngOnChanges(changes: SimpleChanges) {
    this.showFilters = this.filters.length > 0;

    this.filters.forEach(filter => {
      if (filter.type === 'switch') {
        this.filterValues[filter.key] = '';
      }
      // Inicializar el valor predeterminado de los filtros avanzados
      this.advancedFilterOptions[filter.key] = 'contains';
    });
  }

  onFilterChange(key: string, event: any) {
    let value: string;

    if (event && event.target) {
      const inputElement = event.target as HTMLInputElement;
      value = inputElement.value;
    } else {
      value = event !== undefined ? event.toString() : '';
    }
    this.filterChanged.emit({ key, value, condition: this.advancedFilterOptions[key] });
  }

  removeFilter(key: string) {
    this.filterRemoved.emit(key);
    this.filters = this.filters.filter(filter => filter.key !== key);
  }

  resetFilters() {
    console.log("Reset button clicked");
    console.log("Filtros reseteados");
    Object.keys(this.filterValues).forEach(key => {
      this.filterValues[key] = '';
      this.filterChanged.emit({ key: key, value: '', condition: 'equals' });
    });

    this.filters.forEach(filter => {
      const inputElement = document.getElementById(filter.key) as HTMLInputElement | null;
      if (inputElement) {
        inputElement.value = '';
      } else {
        console.log(`Elemento de entrada no encontrado para el filtro: ${filter.key}`);
      }
    });

    this.filtersReset.emit();
  }

  advancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  onAdvancedFilterChange(key: string, value: string) {
    this.advancedFilterOptions[key] = value;
    this.filterChanged.emit({ key, value: this.filterValues[key], condition: value });
  }
}
