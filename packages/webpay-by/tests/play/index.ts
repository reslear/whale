import { WebPayForm } from "../../src";

const start = async (baby?: string) => {
  const webpay = new WebPayForm();

  const result = webpay.addItem({
    id: "3",
    name: "123",
    price: 0.23,
    quantity: 2,
  });

  webpay.addItem({
    name: "Сертификат на 3$",
    price: 5,
    quantity: 1,
  });

  console.log("test:", result, webpay.items);
  console.log("test:", webpay.createSignature("123"));
  /* console.log("total:", webpay.total);
  
  */ console.log(webpay.form);
};

start();
