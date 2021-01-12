import { WordpressUrlApi } from "../../src";

const wp = new WordpressUrlApi({
  host: "",
  auth: {
    login: "",
    password: "",
  },
});

const start = async () => {
  /* const create_post = await wp.post("/wp/v2/orders", {
    title: "order-1",
    orders_categories: [147],
    status: "publish",
    fields: {
      certificate_id: "3",
      certificate_reservation_id: "",
      client_name: "",
      phone: "+312132",
      descr: "",
      email: "",
    },
  }); 
  console.log(create_post);
  
  */
  /* const update_acf = await wp.post("/acf/v3/orders/6327", {
    fields: {
      certificate_id: "3",
      certificate_reservation_id: "",
      client_name: "",
      phone: "+312132",
      descr: "",
      email: "",
    },
  }); */
};

start();
