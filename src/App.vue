<template>
  <a-table
    :data-source="taskDetailList"
    :columns="taskDetailColumns"
    size="middle"
    :rowKey="(record, index) => record.id + index"
    bordered
    :pagination="false"
    :scroll="{ x: 'max-content' }"
  >
    <template #index="{index}">
      {{ ++index }}
    </template>
    <template #customTitle="{record}">
      <a :href="record.link">{{ record.title }}</a>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import * as Mock from 'mockjs';
const { Random } = Mock;

const taskDetailColumns: any[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 50,
    fixed: 'left',
    slots: { customRender: 'index' },
  },
  {
    title: 'title',
    dataIndex: 'title',
    slots: { customRender: 'customTitle' },
    width: 380,
    fixed: 'left',
  },
  {
    title: 'type',
    dataIndex: 'type',
    width: 136,
  },
];

export default defineComponent({
  name: 'App',
  components: {},
  data() {
    const tableMaxHeight = document.body.clientHeight - 230;

    return {
      tableMaxHeight,
      taskDetailColumns,
      taskDetailList: [],
    };
  },
  created() {
    const { data } = Mock.mock({
      'data|20': [
        {
          id: '5fb24f7efeff501e945fef58',
          title: Random.string(20),
          link: 'http://www.baidu.com',
          type: 1,
        },
      ],
    });
    this.taskDetailList = data;
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
