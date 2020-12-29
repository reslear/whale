export interface IFields {
  name: string;
  required: boolean;
  description: string;
  note: string;
  type?: string;
  default?: any;
}

export interface IFieldsSource extends Omit<IFields, "required"> {
  required: string;
}

export interface ITable {
  id: string;
  name: string;
  fields: IFields[];
}

export interface ITableInputs extends Partial<Omit<ITable, "fields">> {
  selector: string;
}
