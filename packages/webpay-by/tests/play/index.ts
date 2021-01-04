import { WebPayForm } from "../../src";

const start = async (baby?: string) => {
  const webpay = new WebPayForm({
    fields: {
      wsb_storeid: "614441705",
      wsb_store: "Название Вашего магазина",
      wsb_order_num: "ORDER-12345678",
    },
    items: [
      {
        id: "3",
        name: "123",
        price: 0.23,
        quantity: 2,
      },
      {
        name: "Сертификат на 3$",
        price: 5,
        quantity: 1,
      },
    ],

    secret: "f3f5e53bb808",
  });

  const result = webpay.getForm();

  console.log(result);
};

start();
