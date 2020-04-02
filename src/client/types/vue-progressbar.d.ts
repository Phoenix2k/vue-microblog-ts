declare module 'vue-progressbar' {
  import { PluginFunction } from 'vue';

  export const install: PluginFunction<{}>;

  interface ProgressMethods {
    fail(): void;
    finish(): void;
    start(): void;
  }

  module 'vue/types/vue' {
    interface Vue {
      $Progress: ProgressMethods;
    }
  }
}
