import * as typesRu from "./types/generated/typesRu.d";
export { typesRu };

export class WebPay {
  items: any[] = [];

  constructor(options: any) {}

  get total() {
    const wsb_tax = 0;
    const wsb_shipping_price = 0;
    const wsb_discount_price = 0;

    let result = this.items.reduce((acc, value) => {
      return (
        acc + value.wsb_invoice_item_price * value.wsb_invoice_item_quantity
      );
    }, 0);

    result = result + wsb_tax + wsb_shipping_price - wsb_discount_price;
    return result;
  }

  add() {}

  get form() {
    return {};
  }
}

// TODO: i18n types by EJS template
export class WebPayEn extends WebPay {}
