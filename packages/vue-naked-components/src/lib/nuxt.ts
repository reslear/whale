import { Module, NuxtOptions } from "@nuxt/types";
import { NuxtOptionsHooks } from "@nuxt/types/config/hooks";
import { join } from "path";

const nuxtModule: Module = function (moduleOptions) {
  const { nuxt } = this;
  const isComponents = !!nuxt.options.components;

  if (!isComponents) {
    throw new Error(
      "please set `components: true` inside `nuxt.config` and ensure using `nuxt >= 2.13.0`"
    );
  }

  const hookCb: NuxtOptionsHooks["components:dirs"] = (dirs) => {
    dirs.push({ path: join(__dirname, "components"), prefix: "nd" });
  };

  if (isComponents) {
    nuxt.hook("components:dirs", hookCb);
  }
};

export default nuxtModule;
