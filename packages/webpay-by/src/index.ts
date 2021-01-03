// TODO: i18n types by EJS template
import { _form_fields, _IFormFields } from "./types/generated/typesRu";
import { createHash } from "crypto";

export type TFieldsItems = Pick<
  _IFormFields,
  | "wsb_invoice_item_name"
  | "wsb_invoice_item_price"
  | "wsb_invoice_item_quantity"
>;

export interface IFormFields extends Omit<_IFormFields, keyof TFieldsItems> {}

export interface IWebPayOptions {}
export type TSignFields =
  | "wsb_seed"
  | "wsb_storeid"
  | "wsb_order_num"
  | "wsb_test"
  | "wsb_currency_id"
  | "wsb_total";

export interface IFieldsItem {
  id?: string;
  index?: number;
  // TODO: tsdoc
  price: number;
  quantity: number;
  name: string;
}

export class WebPayForm {
  #fields: IFormFields;
  #items: IFieldsItem[] = [];
  options: IWebPayOptions = {};

  constructor(fields: Partial<IFormFields> = {}, options: IWebPayOptions = {}) {
    let {
      wsb_invoice_item_name,
      wsb_invoice_item_price,
      wsb_invoice_item_quantity,
      ...form_fields
    } = _form_fields;

    this.#fields = { ...form_fields, ...fields };
    this.options = { ...this.options, ...options };
  }

  get total() {
    let {
      wsb_tax = 0,
      wsb_shipping_price = 0,
      wsb_discount_price = 0,
    } = this.#fields;

    let result = this.#items.reduce((acc, c) => acc + c.price * c.quantity, 0);
    result = result + wsb_tax + wsb_shipping_price - wsb_discount_price;

    return result;
  }

  private uid() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  addItem({ name, price, quantity = 1, id = this.uid() }: IFieldsItem) {
    if (!name || !price) {
      console.error("missing required params");
      return;
    }

    this.#items.push({ id, name, price, quantity });

    return id;
  }

  findItem({ id }: Pick<IFieldsItem, "id">) {
    const index = this.#items.findIndex((item) => item.id === id);

    if (index !== -1) {
      return { ...this.#items[index], index };
    }
  }

  quantity({
    type = "",
    id,
    value = 1,
  }: {
    type?: "" | "plus" | "minus";
    id: string;
    value?: number;
  }) {
    const item = this.findItem({ id });
    if (!item) return;

    let output = item.quantity;

    switch (type) {
      case "plus":
        output = output + value;
        break;
      case "minus":
        let result = output - value;
        output = result <= 0 ? output : result;
        break;
      default:
        output = value >= 1 ? value : output;
        break;
    }

    this.#items[item.index].quantity = output;
  }

  get items() {
    return this.#items;
  }

  get form_fields(): IFormFields {
    let result: IFormFields = {
      ...this.#fields,
      wsb_total: this.total,
    };

    return result;
  }

  get form_items() {
    let result: TFieldsItems = {
      wsb_invoice_item_name: [],
      wsb_invoice_item_price: [],
      wsb_invoice_item_quantity: [],
    };

    this.#items.map((item) => {
      result.wsb_invoice_item_name.push(item.name);
      result.wsb_invoice_item_price.push(item.price);
      result.wsb_invoice_item_quantity.push(item.quantity);
    });

    return result;
  }

  get form(): _IFormFields {
    return { ...this.form_fields, ...this.form_items };
  }

  createSignature = (key: string = "") => {
    const form = this.form;

    const acc =
      form.wsb_seed +
      form.wsb_storeid +
      form.wsb_order_num +
      form.wsb_test +
      form.wsb_currency_id +
      form.wsb_total +
      key;

    const version = form.wsb_version;

    switch (version) {
      case 1:
        return createHash("md5").update(acc).digest("hex");
      case 2:
        return createHash("sha1").update(acc).digest("hex");
      default:
        return "";
    }
  };
}
