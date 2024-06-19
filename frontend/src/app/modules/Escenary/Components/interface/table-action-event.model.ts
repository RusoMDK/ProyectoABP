/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableActionEvent {
  action: 'show' | 'edit' | 'delete' | 'deleteSelected' | 'switchChange' | 'selectAllChange' | 'onAllChecked' | 'create';
  id?: any; // Opcional, no necesario para algunas acciones como 'deleteSelected' o 'selectAllChange'
  checked?: boolean; // Para cualquier otro dato que pueda necesitar, como el estado del switch
  propertyName?: string;
}
