export interface TableActionEvent {
  action: 'show' | 'edit' | 'delete' | 'deleteSelected' | 'switchChange' | 'selectAllChange' |'onAllChecked';
  id?: any; // Opcional, no necesario para algunas acciones como 'deleteSelected' o 'selectAllChange'
  checked?: boolean; // Para cualquier otro dato que pueda necesitar, como el estado del switch
  propertyName?:string;
}
