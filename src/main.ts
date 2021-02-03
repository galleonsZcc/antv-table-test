import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { MessageApi } from 'ant-design-vue/lib/message/index';
import { request, Request } from '@/api';
import 'ant-design-vue/dist/antd.css';
import '../mock';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: MessageApi;
    $ajax: Request;
  }
}

const app = createApp(App);

app.config.globalProperties.$ajax = {
  ...request,
};
app.use(Antd);
app.mount('#app');
