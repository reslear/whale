# wordpress-url-api

Wordpress simple sdk url like api

- base on best http client [axios](https://github.com/axios/axios)
- support authorization with [basic auth plugin](https://github.com/WP-API/Basic-Auth)
- methods **get**, **put**, **post**

## Examples

Create instance

```ts
import { WordpressUrlApi } from "wordpress-url-api";

export const wpApi = new WordpressUrlApi({
  host: "https://example-wp.by/",
  auth: {
    login: "login",
    password: "pass",
  },
});
```

add record to custom post [Custom Post Type UI](https://ru.wordpress.org/plugins/custom-post-type-ui/)

```ts
const create_post = await wpApi.post("/wp/v2/orders", {
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
```

put record

```ts
const update_post = await wpApi.put("/wp/v2/orders/6331", {
  title: "new title2",
  fields: {
    cert: {
      series: "10",
      barcode: "327831728731",
    },
  },
});
```

update [ACF fields](https://github.com/airesvsg/acf-to-rest-api) example:

```ts
const update_acf = await wpApi.post("/acf/v3/orders/6327", {
  fields: {
    certificate_id: "3",
    certificate_reservation_id: "",
    client_name: "",
    phone: "+312132",
    descr: "",
    email: "",
  },
});
```

## TODO:

- upload media example
- user authorization instructions
