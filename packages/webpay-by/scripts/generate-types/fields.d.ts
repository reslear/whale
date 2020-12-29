export interface IFields {
  name: string;
  required: boolean;
  description: string;
  note: string;
}

export interface ITable {
  id: string;
  name: string;
  fields: IFields[];
}

export interface ITableInputs extends Partial<Omit<ITable, "fields">> {
  selector: string;
}
