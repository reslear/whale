# axios-nice-log

Axios interceptor logger for requests query parameters for humans 😜
<img src="https://raw.githubusercontent.com/reslear/whale/main/packages/axios-log/media/thumb.png" width="584">

* many options customizable
* set global defaults
* lightweight \~2kb
* use [chalk](https://github.com/chalk/chalk)

## Setup

``` sh
npm i axios axios-nice-log
```

## Usage

basic

``` ts
import axios from "axios";
import axiosNiceLog from "@reslear/axios-log";

axios.interceptors.request.use(axiosNiceLog);
```

or options

``` ts
import axios from "axios";
import axiosNiceLog from "@reslear/axios-log-human";

axios.interceptors.request.use(
  axiosNiceLog({
    prefix: "My Api",
  })
);
```

multiple or global options usage

``` ts
import axios from "axios";
import { niceLog, INiceLogOptions} from "@reslear/axios-log-human";

const niceLogOptions: INiceLogOptions = {prefix: 'My Api'};

axios.interceptors.request.use(
  niceLog({
    ...niceLogOptions,
    {prefix: 'overwrite prefix'}
  })
);

customAxios.interceptors.request.use(niceLog(niceLogOptions));
```

## Api

Options

| **Option** | **Type** | **Default** | **description** |
| ------ | ---- | ------- | ----------- |
| prefix | string | "axios" | Line prefix |